   function toggleTasks(button, id) {
      const allTasks = document.querySelectorAll(".tasks");
      const allButtons = document.querySelectorAll(".details1, .details2");
      const currentTasks = document.getElementById(id);

      if (currentTasks.style.display === "block") {
        currentTasks.style.display = "none";
        button.textContent = "+";
        return;
      }

      allTasks.forEach(task => task.style.display = "none");
      allButtons.forEach(btn => btn.textContent = "+");

      currentTasks.style.display = "block";
      button.textContent = "-";
    }

    document.querySelector(".details1").addEventListener("click", function() {
      toggleTasks(this, "tasks1");
    });
    document.querySelector(".details2").addEventListener("click", function() {
      toggleTasks(this, "tasks2");
    });
    const competences = document.querySelectorAll(".competence");
    competences.forEach(comp => {
      comp.addEventListener("mouseenter", function() {
        const tooltipText = this.getAttribute("data-description");
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = tooltipText;
        this.appendChild(tooltip);
        setTimeout(() => tooltip.classList.add("show"), 50);
      });

      comp.addEventListener("mouseleave", function() {
        const tooltip = this.querySelector(".tooltip");
        if (tooltip) {
          tooltip.classList.remove("show");
          setTimeout(() => tooltip.remove(), 300);
        }
      });
    });
    fetch("js/data.json")
      .then(response => response.json())
      .then(data => {
        const competences = document.querySelectorAll(".competence");
        competences.forEach(comp => {
          const name = comp.textContent.split("⭐")[0].trim();
          const compData = data.find(c => c.name === name);
          const starsContainer = comp.querySelector(".stars");

          if (compData && starsContainer) {
            starsContainer.innerHTML = "";
            for (let i = 1; i <= 5; i++) {
              const star = document.createElement("i");
              star.classList.add("fa");
              star.classList.add(i <= compData.level ? "fa-star" : "fa-star-o");
              starsContainer.appendChild(star);
            }
          }
        });
      })
      .catch(err => console.error("Erreur de chargement JSON :", err));