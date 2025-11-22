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

// Activity bar functionality (optional - can show/hide sidebar)
const activityIcons = document.querySelectorAll(".activity-icon");
const sidebar = document.getElementById("sidebar");

activityIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Remove active from all activity icons
    activityIcons.forEach((i) => i.classList.remove("active"));
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
