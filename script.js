// Tab switching functionality
const tabs = document.querySelectorAll(".tab");
const fileTreeItems = document.querySelectorAll(".file-tree-item");
const codeFiles = document.querySelectorAll(".code-file");

function switchTab(fileName) {
  // Remove active class from all tabs
  tabs.forEach((tab) => {
    if (tab.dataset.file === fileName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Remove active class from all code files
  codeFiles.forEach((file) => {
    if (file.id === fileName) {
      file.classList.add("active");
    } else {
      file.classList.remove("active");
    }
  });

  // Update file tree active state
  fileTreeItems.forEach((item) => {
    if (item.dataset.file === fileName) {
      item.style.background = "var(--vscode-hover)";
    } else {
      item.style.background = "transparent";
    }
  });

  // Update line numbers height after tab switch (with delay to ensure content is visible)
  setTimeout(() => {
    matchLineNumbersHeight();
  }, 100);

  setTimeout(() => {
    matchLineNumbersHeight();
  }, 300);
}

// Tab click handlers
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchTab(tab.dataset.file);
  });
});

// File tree click handlers
fileTreeItems.forEach((item) => {
  item.addEventListener("click", () => {
    switchTab(item.dataset.file);
  });
});

// Activity bar functionality (only for icons with data-view, not links)
const activityIcons = document.querySelectorAll(".activity-icon[data-view]");
const sidebar = document.getElementById("sidebar");

activityIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Remove active from all activity icons
    document
      .querySelectorAll(".activity-icon")
      .forEach((i) => i.classList.remove("active"));
    // Add active to clicked icon
    icon.classList.add("active");

    // Handle sidebar toggle for explorer
    if (icon.dataset.view === "explorer") {
      if (sidebar.style.display === "none") {
        sidebar.style.display = "flex";
      }
    } else {
      // For other views, you could hide/show different sidebars
      // For now, we'll just keep the explorer visible
    }
  });
});

// Set initial active tab
switchTab("about");

// Match line numbers column height to content column height
const resizeObservers = new Map();

function matchLineNumbersHeight() {
  const allEditorLines = document.querySelectorAll(".editor-lines");

  allEditorLines.forEach((editorLinesContainer) => {
    const lineNumbersColumn = editorLinesContainer.querySelector(
      ".line-numbers-column"
    );
    const lineContentColumn = editorLinesContainer.querySelector(
      ".line-content-column"
    );

    if (!lineNumbersColumn || !lineContentColumn) return;

    // Check if parent code-file is active/visible
    const codeFile = editorLinesContainer.closest(".code-file");
    if (codeFile && !codeFile.classList.contains("active")) {
      return; // Skip inactive sections
    }

    const updateHeight = () => {
      const contentHeight = lineContentColumn.offsetHeight;
      // Check if this is the experience section
      const isExperienceSection =
        editorLinesContainer.closest("#experience") !== null;

      if (isExperienceSection) {
        // Experience section: Match content height, but allow up to 100 lines (2200px) maximum
        const maxLinesHeight = 100 * 22; // 2200px for 100 lines
        if (contentHeight > 0) {
          // Use the smaller of content height or max 100 lines
          const finalHeight = Math.min(contentHeight, maxLinesHeight);
          lineNumbersColumn.style.maxHeight = `${finalHeight}px`;
        }
      } else {
        // Other sections: match content height, limited by CSS to 50 lines
        if (contentHeight > 0) {
          lineNumbersColumn.style.maxHeight = `${contentHeight}px`;
        }
      }
    };

    // Update height immediately
    updateHeight();

    // Use ResizeObserver to watch for content changes (only create once per container)
    if (window.ResizeObserver && !resizeObservers.has(editorLinesContainer)) {
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(lineContentColumn);
      resizeObservers.set(editorLinesContainer, resizeObserver);
    }
  });
}

// Match heights on page load
document.addEventListener("DOMContentLoaded", () => {
  matchLineNumbersHeight();
});

// Also match heights after delays to ensure content is fully rendered (especially important on mobile)
setTimeout(() => {
  matchLineNumbersHeight();
}, 100);

setTimeout(() => {
  matchLineNumbersHeight();
}, 500);

setTimeout(() => {
  matchLineNumbersHeight();
}, 1000);

// Smooth scrolling for editor content
const editorContent = document.querySelector(".editor-content");
if (editorContent) {
  editorContent.style.scrollBehavior = "smooth";
}

// Prevent default link behavior if any
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
    }
  });
});
