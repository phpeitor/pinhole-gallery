(() => {
  const canvas = document.getElementById("rive-error");
  const fallback = document.getElementById("rive-fallback");
  const stage = canvas?.closest(".error-stage");
  if (!canvas) return;

  const showFallback = () => {
    stage?.classList.remove("is-loading");
    canvas.hidden = true;
    if (fallback) fallback.hidden = false;
  };

  if (!window.rive?.Rive) {
    showFallback();
    return;
  }

  let riveInstance;
  let clickInput = null;
  let resetInput = null;
  let triggerInputs = [];
  let activeAnimationIndex = -1;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stateMachineName = canvas.dataset.stateMachine;
  const animationNames = (canvas.dataset.riveAnimations || "")
    .split(",")
    .map(name => name.trim())
    .filter(Boolean);
  const setCanvasClick = value => {
    if (clickInput) clickInput.value = value;
  };

  const playRiveAnimation = animationName => {
    if (!animationName || !animationNames.includes(animationName) || !riveInstance) return;
    animationNames.forEach(name => riveInstance.stop(name));
    riveInstance.play(animationName);
    activeAnimationIndex = animationNames.indexOf(animationName);
  };

  const startRive = (playInitial = false) => {
    stage?.classList.add("is-loading");
    canvas.hidden = false;
    if (fallback) fallback.hidden = true;
    clickInput = null;
    resetInput = null;
    triggerInputs = [];
    activeAnimationIndex = -1;

    try {
      riveInstance = new window.rive.Rive({
        src: canvas.dataset.riveSrc,
        canvas,
        autoplay: playInitial || (!reduceMotion && animationNames.length === 0),
        ...(stateMachineName ? { stateMachines: stateMachineName } : {}),
        layout: window.rive.Layout && window.rive.Fit
          ? new window.rive.Layout({ fit: window.rive.Fit.Cover, alignment: window.rive.Alignment?.Center })
          : undefined,
        onLoad: () => {
          stage?.classList.remove("is-loading");
          riveInstance.resizeDrawingSurfaceToCanvas();
          const inputs = stateMachineName ? (riveInstance.stateMachineInputs(stateMachineName) || []) : [];
          clickInput = inputs.find(input => input.name === canvas.dataset.clickInput) || null;
          resetInput = inputs.find(input => input.name === canvas.dataset.resetInput) || null;
          const triggerNames = (canvas.dataset.triggerInputs || "")
            .split(",")
            .map(name => name.trim())
            .filter(Boolean);
          triggerInputs = triggerNames
            .map(name => inputs.find(input => input.name === name))
            .filter(Boolean);
          document.querySelectorAll("[data-rive-animation]").forEach(button => {
            button.disabled = !animationNames.includes(button.dataset.riveAnimation);
          });
        },
        onLoadError: showFallback,
      });
    } catch (error) {
      console.error("No se pudo inicializar la animación Rive", error);
      showFallback();
    }
  };

  startRive();

  window.addEventListener("resize", () => riveInstance?.resizeDrawingSurfaceToCanvas());

  canvas.addEventListener("pointerdown", () => setCanvasClick(true));
  window.addEventListener("pointerup", () => setCanvasClick(false));
  canvas.addEventListener("pointerleave", () => setCanvasClick(false));

  document.getElementById("rive-reset")?.addEventListener("click", () => {
    setCanvasClick(false);
    resetInput?.fire();
    window.setTimeout(() => {
      riveInstance?.cleanup();
      startRive(true);
    }, 100);
  });

  document.querySelectorAll("[data-rive-trigger]").forEach(button => {
    button.addEventListener("click", () => {
      const trigger = triggerInputs.find(input => input.name === button.dataset.riveTrigger);
      trigger?.fire();
    });
  });

  document.querySelectorAll("[data-rive-animation]").forEach(button => {
    button.addEventListener("click", () => {
      playRiveAnimation(button.dataset.riveAnimation);
    });
  });

  if (animationNames.length > 0) {
    canvas.addEventListener("click", () => {
      const nextIndex = (activeAnimationIndex + 1) % animationNames.length;
      playRiveAnimation(animationNames[nextIndex]);
    });
  }

  document.querySelectorAll("[data-rive-home], #rive-home-hotspot").forEach(homeLink => {
    homeLink.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setCanvasClick(true);
      const href = event.currentTarget.href;
      window.setTimeout(() => window.location.assign(href), 180);
    });
  });
})();
