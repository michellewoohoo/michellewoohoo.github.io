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

// Restructure editor lines to have independent line number column
function restructureEditorLines() {
  const allEditorLines = document.querySelectorAll(".editor-lines");

  allEditorLines.forEach((editorLinesContainer) => {
    // Check if already restructured
    if (editorLinesContainer.querySelector(".line-numbers-column")) {
      fillLineNumbers(editorLinesContainer);
      return;
    }

    const editorLines = editorLinesContainer.querySelectorAll(".editor-line");
    if (editorLines.length === 0) return;

    // Create columns
    const lineNumbersColumn = document.createElement("div");
    lineNumbersColumn.className = "line-numbers-column";

    const lineContentColumn = document.createElement("div");
    lineContentColumn.className = "line-content-column";

    // Extract line numbers and content
    editorLines.forEach((line) => {
      const lineNumber = line.querySelector(".line-number");
      const lineContent = line.querySelector(".line-content");

      if (lineNumber) {
        const numberWrapper = document.createElement("div");
        numberWrapper.className = "line-number-wrapper";
        numberWrapper.appendChild(lineNumber.cloneNode(true));
        lineNumbersColumn.appendChild(numberWrapper);
      }

      if (lineContent) {
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "line-content-wrapper";
        contentWrapper.appendChild(lineContent.cloneNode(true));
        lineContentColumn.appendChild(contentWrapper);
      }
    });

    // Clear original content and add new structure
    editorLinesContainer.innerHTML = "";
    editorLinesContainer.appendChild(lineNumbersColumn);
    editorLinesContainer.appendChild(lineContentColumn);

    // Fill line numbers to bottom
    fillLineNumbers(editorLinesContainer);
  });
}

// Fill line numbers up to 50 (CSS will clip them to match content height)
function fillLineNumbers(editorLinesContainer) {
  const lineNumbersColumn = editorLinesContainer.querySelector(
    ".line-numbers-column"
  );
  const lineContentColumn = editorLinesContainer.querySelector(
    ".line-content-column"
  );

  if (!lineNumbersColumn || !lineContentColumn) return;

  // Get the highest current line number from existing content
  const existingLineNumbers =
    lineNumbersColumn.querySelectorAll(".line-number");
  let highestNumber = 0;
  existingLineNumbers.forEach((num) => {
    const numValue = parseInt(num.textContent.trim());
    if (numValue > highestNumber) {
      highestNumber = numValue;
    }
  });

  // Count how many we already have
  const currentCount = existingLineNumbers.length;
  const maxLines = 50;

  // Add line numbers up to 50 (or until we match content lines, whichever is less)
  const contentLines = lineContentColumn.querySelectorAll(
    ".line-content-wrapper"
  ).length;
  const linesNeeded = Math.min(maxLines, contentLines) - currentCount;

  // If we have fewer than maxLines and content has more lines, add more
  if (currentCount < maxLines) {
    const additionalLines = Math.min(
      maxLines - currentCount,
      contentLines - currentCount
    );

    for (let i = 0; i < additionalLines; i++) {
      highestNumber++;

      // Add line number
      const numberWrapper = document.createElement("div");
      numberWrapper.className = "line-number-wrapper";
      const lineNumber = document.createElement("span");
      lineNumber.className = "line-number";
      lineNumber.textContent = highestNumber;
      numberWrapper.appendChild(lineNumber);
      lineNumbersColumn.appendChild(numberWrapper);

      // Only add empty content wrapper if content doesn't already have one
      if (i < contentLines - currentCount) {
        // Content already exists, no need to add
      } else {
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "line-content-wrapper";
        const lineContent = document.createElement("div");
        lineContent.className = "line-content";
        contentWrapper.appendChild(lineContent);
        lineContentColumn.appendChild(contentWrapper);
      }
    }
  }

  // Ensure we have exactly 50 line numbers
  while (
    lineNumbersColumn.querySelectorAll(".line-number-wrapper").length < maxLines
  ) {
    highestNumber++;
    const numberWrapper = document.createElement("div");
    numberWrapper.className = "line-number-wrapper";
    const lineNumber = document.createElement("span");
    lineNumber.className = "line-number";
    lineNumber.textContent = highestNumber;
    numberWrapper.appendChild(lineNumber);
    lineNumbersColumn.appendChild(numberWrapper);
  }

  // Match the line numbers column height to the content column height
  const matchHeights = () => {
    const contentHeight = lineContentColumn.offsetHeight;
    lineNumbersColumn.style.maxHeight = `${contentHeight}px`;
  };

  // Match heights immediately
  matchHeights();

  // Use ResizeObserver to keep heights matched
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      matchHeights();
    });
    resizeObserver.observe(lineContentColumn);
  } else {
    // Fallback: match on window resize
    window.addEventListener("resize", matchHeights);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  restructureEditorLines();
});

// Also run after a short delay to ensure everything is loaded
setTimeout(() => {
  restructureEditorLines();
}, 100);
