/* JavaScript Document

TemplateMo 603 Nexaverse

https://templatemo.com/tm-603-nexaverse

*/

// Loading Screen
window.addEventListener('load', () => {
   setTimeout(() => {
      document.getElementById('loadingScreen').classList.add('hidden');
   }, 1000);
});

// Menu Item Click Handler
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const menuGrid = document.getElementById('menuGrid');
const mainHeader = document.getElementById('mainHeader');
const mainFooter = document.getElementById('mainFooter');
let isTransitioning = false;

menuItems.forEach(item => {
   item.addEventListener('click', () => {
      if (isTransitioning) return;

      const sectionId = item.dataset.section;

      if(sectionId === "services"){
          console.log("PIN OPEN");
          document.getElementById("pinModal").classList.add("active");
          return;
      }

      showSection(sectionId);
   });
});

function showSection(sectionId) {
   isTransitioning = true;

   // First, ensure all menu items are in visible state before transitioning
   menuItems.forEach((item) => {
      // Remove initial-load class
      item.classList.remove('initial-load');

      // Set to visible state explicitly
      item.style.opacity = '1';
      item.style.transform = 'translateY(0) scale(1)';
      item.style.animation = 'none';
   });

   // Force reflow to apply the visible state
   void menuGrid.offsetWidth;

   // Now apply staggered fade out transition
   menuItems.forEach((item, index) => {
      setTimeout(() => {
         item.style.transition = 'all 0.4s ease-out';
         item.style.opacity = '0';
         item.style.transform = 'translateY(40px) scale(0.9)';
      }, index * 50);
   });

   // Hide header and footer
   mainHeader.style.animation = 'none';
   mainHeader.style.opacity = '1';
   mainFooter.style.animation = 'none';
   mainFooter.style.opacity = '1';

   void mainHeader.offsetWidth;

   mainHeader.style.transition = 'opacity 0.4s ease';
   mainHeader.style.opacity = '0';
   mainFooter.style.transition = 'opacity 0.4s ease';
   mainFooter.style.opacity = '0';

   // Show content section after menu animation
   setTimeout(() => {
      menuGrid.style.display = 'none';
      mainHeader.style.display = 'none';
      mainFooter.style.display = 'none';

      // Reset menu item styles for next time
      menuItems.forEach(item => {
         item.style.transition = '';
         item.style.opacity = '';
         item.style.transform = '';
         item.classList.remove('exit-up', 'visible');
      });

      // Remove previous section
contentSections.forEach(section => {
    section.classList.remove('active');
});

      const section = document.getElementById(sectionId);
      section.classList.add('active');

      

      // Animate stats if introduction section
      if (sectionId === 'introduction') {
         setTimeout(animateStats, 500);
      }

      isTransitioning = false;
   }, 550);
}

function backToMenu() {
   if (isTransitioning) return;
   isTransitioning = true;

   const activeSection = document.querySelector('.content-section.active');
   if (activeSection) {
      // Get fixed elements that need to fade out
      const sectionHeaderSmall = activeSection.querySelector('.section-header-small');
      const backBtn = activeSection.querySelector('.back-btn');

      // Step 1: Cancel the forwards animation so we can control opacity
      activeSection.style.animation = 'none';
      activeSection.style.opacity = '1'; // Reset to visible state first

      // Force reflow to apply the animation cancel
      void activeSection.offsetWidth;

      // Step 2: Now apply fade out transition to ALL elements
      activeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      activeSection.style.opacity = '0';
      activeSection.style.transform = 'translateY(-20px)';

      if (sectionHeaderSmall) {
         sectionHeaderSmall.style.transition = 'opacity 0.5s ease';
         sectionHeaderSmall.style.opacity = '0';
      }
      if (backBtn) {
         backBtn.style.transition = 'opacity 0.5s ease';
         backBtn.style.opacity = '0';
      }

      // Step 3: Wait for complete fade out
      setTimeout(() => {
         // Hide section completely
         activeSection.classList.remove('active');
         activeSection.style.animation = '';
         activeSection.style.opacity = '';
         activeSection.style.transform = '';
         activeSection.style.transition = '';

         if (sectionHeaderSmall) {
            sectionHeaderSmall.style.opacity = '';
            sectionHeaderSmall.style.transition = '';
         }
         if (backBtn) {
            backBtn.style.opacity = '';
            backBtn.style.transition = '';
         }
// Clear all active sections before showing menu
contentSections.forEach(section => {
    section.classList.remove('active');
});
         // Step 4: Prepare menu elements (hidden initially)
         menuGrid.style.display = 'grid';
         mainHeader.style.display = 'block';
         mainFooter.style.display = 'block';

         // Cancel CSS animations to prevent re-triggering
         mainHeader.style.animation = 'none';
         mainFooter.style.animation = 'none';

         mainHeader.style.opacity = '0';
         mainHeader.style.transform = 'translateY(20px)';
         mainFooter.style.opacity = '0';

         menuItems.forEach(item => {
            item.classList.remove('exit-up', 'initial-load', 'return', 'visible');
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.9)';
         });

         // Step 5: Brief pause then fade in menu
         setTimeout(() => {
            // Fade in header
            mainHeader.style.transition = 'all 0.5s ease';
            mainHeader.style.opacity = '1';
            mainHeader.style.transform = 'translateY(0)';

            // Fade in footer
            mainFooter.style.transition = 'all 0.5s ease';
            mainFooter.style.opacity = '1';

            // Staggered fade in for menu items
            menuItems.forEach((item, index) => {
               setTimeout(() => {
                  item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0) scale(1)';
               }, index * 80);
            });

            // Step 6: Clean up after all animations complete
            setTimeout(() => {
               mainHeader.style.transition = '';
               mainHeader.style.transform = '';
               mainFooter.style.transition = '';

               menuItems.forEach(item => {
                  item.style.transition = '';
                  item.style.opacity = '';
                  item.style.transform = '';
                  item.classList.add('visible');
               });

               isTransitioning = false;
            }, 600);
         }, 150);
      }, 550);
   }
}

// Animate Stats
function animateStats() {
   const metricValues = document.querySelectorAll('.metric-value[data-target]');
   metricValues.forEach((el, index) => {
      setTimeout(() => {
         const target = parseInt(el.dataset.target);
         let current = 0;
         const increment = target / 40;
         const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
               current = target;
               clearInterval(timer);
            }
            el.textContent = Math.floor(current);
         }, 30);
      }, index * 200);
   });
}

// Tab Switching
function switchTab(btn, tabId) {
   document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');

   document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
   document.getElementById(tabId).classList.add('active');
}

// Gallery Filter
function filterGallery(category, btn) {
   document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');

   const items = document.querySelectorAll('.gallery-item');
   items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
         item.style.display = 'block';
         item.style.animation = 'tabFade 0.4s ease-out';
      } else {
         item.style.display = 'none';
      }
   });
}

// Close image preview using ESC key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.getElementById("imagePreview").classList.remove("active");
    }
});


// PIN UNLOCK
function unlockVault(){

    const pinInput = document.getElementById("pinInput");
    const pin = pinInput.value;

    if(pin === "1061"){

        document.getElementById("pinModal").classList.remove("active");

        pinInput.value = ""; // Clear after success

        showSection("services");

    } else {

        alert("Wrong PIN");

        pinInput.value = ""; // Clear after wrong PIN

        pinInput.focus();

    }

}

// AUTO CHECK PIN (4 digits only)
const pinInput = document.getElementById("pinInput");

pinInput.addEventListener("input", function () {

    // Numbers only
    this.value = this.value.replace(/\D/g, "");

    // Auto unlock after 4 digits
    if(this.value.length === 4){
        unlockVault();
    }

});


// =========================
// IMAGE PREVIEW
// =========================

const preview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");

const previewTitle = document.getElementById("previewTitle");
const previewSubtitle = document.getElementById("previewSubtitle");
const closePreview = document.querySelector(".close-preview");

// Click sa gallery image
document.querySelectorAll(".gallery-item, .portfolio-card").forEach(item => {

    item.onclick = function () {

        preview.style.display = "flex";

        previewImg.src = item.querySelector("img").src;

        // Kuhaa ang title sa card
        const title = item.querySelector("h4");
        const desc = item.querySelector("p");

        previewTitle.textContent = title ? title.textContent : "";
        previewSubtitle.textContent = desc ? desc.textContent : "";

    };

});

// Close pinaagi sa X
closePreview.addEventListener("click", function () {

    preview.style.display = "none";

});

// Close kung i-click ang dark background
preview.addEventListener("click", function (e) {

    if (e.target === preview) {
        preview.style.display = "none";
    }

});

// Close gamit ESC key
document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        preview.style.display = "none";

    }

});

// ENTER KEY FOR PIN
document.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        const pinModal = document.getElementById("pinModal");

        // kung visible ang PIN modal
        if (pinModal.classList.contains("active")) {
            unlockVault();
        }

    }

});


// =========================
// INTRO TABS
// =========================

function switchIntroTab(tab, btn){

    const work = document.getElementById("workVisual");
    const show = document.getElementById("showreelVisual");
    const workValues = document.getElementById("workValues");
   const showValues = document.getElementById("showreelValues");

    const buttons = document.querySelectorAll(".intro-cta-group button");

    // Active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if(tab === "work"){

    show.classList.remove("active");
    show.classList.add("hide-right");

    showValues.classList.remove("active");
    showValues.classList.add("hide-right");

    setTimeout(() => {

        work.classList.remove("hide-left");
        work.classList.add("active");

        workValues.classList.remove("hide-left");
        workValues.classList.add("active");

    }, 200);

}else{

    work.classList.remove("active");
    work.classList.add("hide-left");

    workValues.classList.remove("active");
    workValues.classList.add("hide-left");

    setTimeout(() => {

        show.classList.remove("hide-right");
        show.classList.add("active");

        showValues.classList.remove("hide-right");
        showValues.classList.add("active");

    }, 200);

}

}

// Default active button
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".intro-cta-primary").classList.add("active");
});


// =========================
// GAMES PREVIEW
// =========================

document.querySelectorAll(".testimonial-card").forEach(card => {

    card.addEventListener("click", function () {

        preview.style.display = "flex";

        previewImg.src = card.querySelector("img").src;

        previewTitle.textContent =
            card.querySelector(".author-info h5").textContent;

        previewSubtitle.textContent =
            card.querySelector(".author-info p").textContent;

    });

});


function openTab(tabName, button){

    document.querySelectorAll(".tab-content").forEach(tab=>{
        tab.style.display="none";
        tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    const activeTab=document.getElementById(tabName);

    if(activeTab){
        activeTab.style.display="block";
        activeTab.classList.add("active");
    }

    button.classList.add("active");
}

// =========================
// SERVICE MODAL
// =========================

const serviceModal = document.getElementById("serviceModal");
const closeService = document.querySelector(".close-service");
const cancelService = document.getElementById("cancelService");
const saveService = document.getElementById("saveService");

let currentRow = null;

// Open Modal
document.addEventListener("click", function(e){

    if(e.target.classList.contains("service-btn")){

        currentRow = e.target.closest("tr");

        const cells = currentRow.querySelectorAll("td");

        document.getElementById("editServiceName").value = cells[0].innerText;
document.getElementById("editInterval").value = cells[1].innerText;
document.getElementById("editStatus").value = cells[2].innerText;
document.getElementById("editLastOdo").value = cells[3].innerText;
document.getElementById("editLastDate").value = cells[4].innerText;
document.getElementById("editNextOdo").value = cells[5].innerText;
document.getElementById("editNextDate").value = cells[6].innerText;
document.getElementById("editBrand").value = cells[7].innerText;

        serviceModal.style.display = "flex";

    }

});
// Close
closeService.onclick = () => serviceModal.style.display = "none";
cancelService.onclick = () => serviceModal.style.display = "none";

// Save
saveService.onclick = () => {

    if (!currentRow) return;

    const cells = currentRow.querySelectorAll("td");

    cells[0].innerText = document.getElementById("editServiceName").value;
    cells[1].innerText = document.getElementById("editInterval").value;
    cells[2].innerText = document.getElementById("editStatus").value;
    cells[3].innerText = document.getElementById("editLastOdo").value;
    cells[4].innerText = document.getElementById("editLastDate").value;
    cells[5].innerText = document.getElementById("editNextOdo").value;
    cells[6].innerText = document.getElementById("editNextDate").value;
    cells[7].innerText = document.getElementById("editBrand").value;

    // SAVE SERVICE DATA
    const activeTab = currentRow.closest(".tab-content").id;

    localStorage.setItem(
        "service_" + activeTab,
        currentRow.closest("table").innerHTML
    );

    if(window.saveServiceData){

        saveServiceData(
            activeTab,
            currentRow.closest("table").innerHTML
        );

    }

    updateStatusCount();

    serviceModal.style.display = "none";

};


// LOAD SERVICE DATA FROM FIREBASE

async function loadFirebaseServices(){

    if(!window.loadService) return;

    document.querySelectorAll(".tab-content").forEach(async tab => {

        const savedService = await window.loadService(tab.id);

        if(savedService){

            const table = tab.querySelector("table");

            if(table){
                table.innerHTML = savedService;
            }

        }

    });

}

window.addEventListener("load", loadFirebaseServices);


// STATUS COUNT

function updateStatusCount(){

    let completed = 0;
    let dueSoon = 0;
    let overdue = 0;


    document.querySelectorAll(".tab-content tbody tr").forEach(row => {

        const status = row.querySelectorAll("td")[2];

        if(status){

            let value = status.innerText.trim();

if(value.includes("Healthy") || value.includes("Replaced")){
    completed++;
}

else if(value.includes("Due Soon")){
    dueSoon++;
}

else if(value.includes("Overdue")){
    overdue++;
}

        }

    });


    document.getElementById("completedCount").innerText = completed;
    document.getElementById("dueSoonCount").innerText = dueSoon;
    document.getElementById("overdueCount").innerText = overdue;

}


updateStatusCount();



const odoText = document.getElementById("currentOdo");
const odoInput = document.getElementById("odoInput");
const savedOdo = localStorage.getItem("currentOdo");

if(savedOdo){
    odoText.innerText = Number(savedOdo).toLocaleString();
}

if(odoText && odoInput){

    odoText.onclick = () => {

        odoText.style.display = "none";
        odoInput.style.display = "block";

        odoInput.value = odoText.innerText.replace(/,/g,'');
        odoInput.focus();

    };


    odoInput.onkeydown = (e) => {

        if(e.key === "Enter"){

            let newOdo = odoInput.value.replace(/\D/g,'');

            if(newOdo !== ""){

    odoText.innerText = Number(newOdo).toLocaleString();

    localStorage.setItem("currentOdo", newOdo);

}

            odoInput.style.display = "none";
            odoText.style.display = "block";

        }

    };

}

function openSectionFromAbout(sectionId) {

    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    const section = document.getElementById(sectionId);
    section.classList.add('active');

}


/* =====================================
        EXPERTISE ANIMATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const fills = document.querySelectorAll(".skill-fill");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.4

    });

    fills.forEach(fill=>{

        fill.style.opacity="0";

        observer.observe(fill);

    });

});

// =========================================================
// REYWALKER NOTES
// =========================================================



const noteFirebase = import("./note.js");

(function () {

    const notesGrid = document.getElementById("notesGrid");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const newNoteTitle = document.getElementById("newNoteTitle");
    const newNoteText = document.getElementById("newNoteText");
    const newNoteCategory = document.getElementById("newNoteCategory");
    const notesSearch = document.getElementById("notesSearch");
    const clearNotesSearch = document.getElementById("clearNotesSearch");

    const sideItems = document.querySelectorAll(".keep-side-item");

    
    
    
    
    // ---------------------------------------------------------
    // LOAD EXISTING NOTES
    // ---------------------------------------------------------

    let notesData =
        JSON.parse(localStorage.getItem("reywalkerNotes")) || [];

    let selectedNoteColor = "white";
    let selectedCategory = "all";

    // ---------------------------------------------------------
    // SAVE NOTES
    // ---------------------------------------------------------

async function saveNotes() {

    localStorage.setItem(
        "reywalkerNotes",
        JSON.stringify(notesData)
    );

    const { saveNotesToFirebase } = await noteFirebase;

    await saveNotesToFirebase(notesData);

}

 // ---------------------------------------------------------
    // LOAD NOTES FROM FIREBASE
    // ---------------------------------------------------------

    async function loadNotesFromFirebase() {

    try {

        const { loadNotesFromFirebase: loadFromFirebase } =
            await noteFirebase;

        const firebaseNotes = await loadFromFirebase();

        if (Array.isArray(firebaseNotes)) {

            notesData = firebaseNotes;

            localStorage.setItem(
                "reywalkerNotes",
                JSON.stringify(notesData)
            );

            renderNotes();

        }

    } catch (error) {

        console.error(
            "Firebase Notes Load Error:",
            error
        );

    }

}
    // ---------------------------------------------------------
    // ESCAPE HTML
    // ---------------------------------------------------------

    function escapeNotesHTML(text) {

        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    function escapeNotesAttribute(text) {

        return escapeNotesHTML(text);

    }

    // ---------------------------------------------------------
    // CLOSE ALL ZOOM
    // ---------------------------------------------------------

    function closeAllZoom() {

        document
            .querySelectorAll(".keep-note.note-zoomed")
            .forEach(card => {

                card.classList.remove("note-zoomed");

            });

        const overlay =
            document.querySelector(".note-zoom-overlay");

        if (overlay) {

            overlay.classList.remove("active");

        }

    }

    // ---------------------------------------------------------
    // ADD NOTE
    // ---------------------------------------------------------

    if (addNoteBtn) {

        addNoteBtn.addEventListener("click", function () {

            const title = newNoteTitle
                ? newNoteTitle.value.trim()
                : "";

            const text = newNoteText
                ? newNoteText.value.trim()
                : "";

            const category = newNoteCategory
                ? newNoteCategory.value
                : "personal";

            if (!title && !text) {

                if (newNoteText) {
                    newNoteText.focus();
                }

                return;
            }

            const note = {

                id: Date.now(),

                title: title || "Untitled",

                text: text,

                category: category,

                color: selectedNoteColor,

                archived: false,

                trashed: false

            };

            notesData.unshift(note);

            saveNotes();

            renderNotes(
                notesSearch
                    ? notesSearch.value
                    : ""
            );

            // Clear inputs

            if (newNoteTitle) {
                newNoteTitle.value = "";
            }

            if (newNoteText) {
                newNoteText.value = "";
            }

            // Reset category

            if (newNoteCategory) {
                newNoteCategory.value = "personal";
            }

            // Reset color

            selectedNoteColor = "white";

            document
                .querySelectorAll(".keep-color")
                .forEach(btn => {

                    btn.classList.remove("selected");

                });

            const white =
                document.querySelector(
                    '.keep-color[data-color="white"]'
                );

            if (white) {
                white.classList.add("selected");
            }

        });

    }

    // ---------------------------------------------------------
    // COLOR
    // ---------------------------------------------------------

    document
        .querySelectorAll(".keep-create .keep-color")
        .forEach(button => {

            button.addEventListener("click", function () {

                document
                    .querySelectorAll(".keep-create .keep-color")
                    .forEach(btn =>
                        btn.classList.remove("selected")
                    );

                this.classList.add("selected");

                selectedNoteColor =
                    this.dataset.color;

            });

        });

    // ---------------------------------------------------------
    // SIDEBAR
    // ---------------------------------------------------------

    sideItems.forEach(button => {

        button.addEventListener("click", function () {

            const category =
                this.dataset.category;

            // Normal category buttons

            if (category) {

                closeAllZoom();

                sideItems.forEach(btn =>
                    btn.classList.remove("active")
                );

                this.classList.add("active");

                selectedCategory = category;

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

                return;
            }

            // ARCHIVE

            const text =
                this.innerText.trim().toLowerCase();

            if (text.includes("archive")) {

                closeAllZoom();

                sideItems.forEach(btn =>
                    btn.classList.remove("active")
                );

                this.classList.add("active");

                selectedCategory = "archive";

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

                return;
            }

            // TRASH

            if (text.includes("trash")) {

                closeAllZoom();

                sideItems.forEach(btn =>
                    btn.classList.remove("active")
                );

                this.classList.add("active");

                selectedCategory = "trash";

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

            }

        });

    });

    // ---------------------------------------------------------
    // RENDER NOTES
    // ---------------------------------------------------------

    function renderNotes(searchText = "") {

        if (!notesGrid) return;

        closeAllZoom();

        notesGrid.innerHTML = "";

        const search =
            String(searchText)
                .toLowerCase()
                .trim();

        const filteredNotes =
            notesData.filter(note => {

                const isArchived =
                    note.archived === true;

                const isTrashed =
                    note.trashed === true;

                // ARCHIVE

                if (selectedCategory === "archive") {

                    if (!isArchived || isTrashed) {
                        return false;
                    }

                }

                // TRASH

                else if (selectedCategory === "trash") {

                    if (!isTrashed) {
                        return false;
                    }

                }

                // NORMAL

                else {

                    if (isArchived || isTrashed) {
                        return false;
                    }

                    if (
                        selectedCategory !== "all" &&
                        note.category !== selectedCategory
                    ) {
                        return false;
                    }

                }

                // SEARCH

                const searchMatch =

                    String(note.title || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(note.text || "")
                        .toLowerCase()
                        .includes(search);

                return searchMatch;

            });

        // -----------------------------------------------------
        // EMPTY
        // -----------------------------------------------------

        if (filteredNotes.length === 0) {

            let message = "No notes yet";

            if (selectedCategory === "archive") {
                message = "No archived notes";
            }

            if (selectedCategory === "trash") {
                message = "Trash is empty";
            }

            notesGrid.innerHTML = `
                <div class="keep-empty">
                    <div class="keep-empty-icon">📝</div>
                    <div>${message}</div>
                </div>
            `;

            return;
        }

        // -----------------------------------------------------
        // CREATE CARDS
        // -----------------------------------------------------

        filteredNotes.forEach(note => {

            const realIndex =
                notesData.findIndex(
                    n => n.id === note.id
                );

            const card =
                document.createElement("div");

            card.className =
                "keep-note keep-" +
                (note.color || "white");

            card.dataset.id =
                note.id;

            // -------------------------------------------------
            // NORMAL NOTE
            // -------------------------------------------------

            if (
                selectedCategory !== "trash" &&
                selectedCategory !== "archive"
            ) {

                card.innerHTML = `

                    <div class="keep-note-title">
                        ${escapeNotesHTML(note.title)}
                    </div>

                    <div class="keep-note-body"> 
    ${escapeNotesHTML(note.text.trimStart())}
</div>

                    <div class="keep-note-actions">

                        <button
                            type="button"
                            class="keep-edit-btn"
                            title="Edit">
                            ✎
                        </button>

                        <button
                            type="button"
                            class="keep-archive-btn"
                            title="Archive">
                            🗄
                        </button>

                        <button
                            type="button"
                            class="keep-delete-btn"
                            title="Move to Trash">
                            🗑
                        </button>

                    </div>

                `;

            }

            // -------------------------------------------------
            // ARCHIVED NOTE
            // -------------------------------------------------

            else if (
                selectedCategory === "archive"
            ) {

                card.innerHTML = `

                    <div class="keep-note-title">
                        ${escapeNotesHTML(note.title)}
                    </div>

                    <div class="keep-note-body">
                        ${escapeNotesHTML(note.text)}
                    </div>

                    <div class="keep-note-actions">

                        <button
                            type="button"
                            class="keep-restore-btn"
                            title="Restore">
                            ↩
                        </button>

                        <button
                            type="button"
                            class="keep-delete-btn"
                            title="Move to Trash">
                            🗑
                        </button>

                    </div>

                `;

            }

            // -------------------------------------------------
            // TRASH NOTE
            // -------------------------------------------------

            else {

                card.innerHTML = `

                    <div class="keep-note-title">
                        ${escapeNotesHTML(note.title)}
                    </div>

                    <div class="keep-note-body">
                        ${escapeNotesHTML(note.text)}
                    </div>

                    <div class="keep-note-actions">

                        <button
                            type="button"
                            class="keep-restore-btn"
                            title="Restore">
                            ↩
                        </button>

                        <button
                            type="button"
                            class="keep-permanent-delete-btn"
                            title="Delete Permanently">
                            🗑
                        </button>

                    </div>

                `;

            }

            // -------------------------------------------------
            // ZOOM NOTE
            // -------------------------------------------------

            card.addEventListener("click", function (e) {

                // Ayaw zoom kung action button
                if (
                    e.target.closest(".keep-note-actions")
                ) {
                    return;
                }

                // Close other notes
                document
                    .querySelectorAll(".keep-note.note-zoomed")
                    .forEach(otherCard => {

                        otherCard.classList.remove(
                            "note-zoomed"
                        );

                    });

                // Get/create overlay
                let overlay =
                    document.querySelector(
                        ".note-zoom-overlay"
                    );

                if (!overlay) {

                    overlay =
                        document.createElement("div");

                    overlay.className =
                        "note-zoom-overlay";

                    document.body.appendChild(
                        overlay
                    );

                    overlay.addEventListener(
                        "click",
                        function () {

                            closeAllZoom();

                        }
                    );

                }

                // Zoom selected note
                card.classList.add(
                    "note-zoomed"
                );

                // Dark background
                overlay.classList.add(
                    "active"
                );

            });

            // -------------------------------------------------
            // EDIT
            // -------------------------------------------------

            const editBtn =
                card.querySelector(
                    ".keep-edit-btn"
                );

            if (editBtn) {

                editBtn.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        closeAllZoom();

                        editNote(realIndex);

                    }
                );

            }

            // -------------------------------------------------
            // ARCHIVE
            // -------------------------------------------------

            const archiveBtn =
                card.querySelector(
                    ".keep-archive-btn"
                );

            if (archiveBtn) {

                archiveBtn.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        closeAllZoom();

                        archiveNote(realIndex);

                    }
                );

            }

            // -------------------------------------------------
            // RESTORE
            // -------------------------------------------------

            const restoreBtn =
                card.querySelector(
                    ".keep-restore-btn"
                );

            if (restoreBtn) {

                restoreBtn.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        closeAllZoom();

                        restoreNote(realIndex);

                    }
                );

            }

            // -------------------------------------------------
            // DELETE
            // -------------------------------------------------

            const deleteBtn =
                card.querySelector(
                    ".keep-delete-btn"
                );

            if (deleteBtn) {

                deleteBtn.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        closeAllZoom();

                        moveToTrash(realIndex);

                    }
                );

            }

            // -------------------------------------------------
            // PERMANENT DELETE
            // -------------------------------------------------

            const permanentDeleteBtn =
                card.querySelector(
                    ".keep-permanent-delete-btn"
                );

            if (permanentDeleteBtn) {

                permanentDeleteBtn.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        closeAllZoom();

                        permanentDeleteNote(
                            realIndex
                        );

                    }
                );

            }

            notesGrid.appendChild(card);

        });

    }

    // ---------------------------------------------------------
    // EDIT NOTE
    // ---------------------------------------------------------

    function editNote(index) {

        const note = notesData[index];

        if (!note) return;

        const card =
            document.querySelector(
                `.keep-note[data-id="${note.id}"]`
            );

        if (!card) return;

        closeAllZoom();

        card.classList.add("editing");

        card.innerHTML = `

            <input
                class="keep-edit-title"
                type="text"
                value="${escapeNotesAttribute(note.title)}"
            >

            <textarea
                class="keep-edit-body"
                placeholder="Take a note..."
            >${escapeNotesHTML(note.text)}</textarea>

            <div class="keep-note-actions">

                <button
                    type="button"
                    class="keep-save-btn">
                    ✓
                </button>

                <button
                    type="button"
                    class="keep-cancel-edit-btn">
                    ×
                </button>

            </div>

        `;

        const titleInput =
            card.querySelector(
                ".keep-edit-title"
            );

        const bodyInput =
            card.querySelector(
                ".keep-edit-body"
            );

        // SAVE

        card.querySelector(
            ".keep-save-btn"
        ).addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

                notesData[index].title =
                    titleInput.value.trim() ||
                    "Untitled";

                notesData[index].text =
                    bodyInput.value.trim();

                saveNotes();

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

            }
        );

        // CANCEL

        card.querySelector(
            ".keep-cancel-edit-btn"
        ).addEventListener(
            "click",
            function (e) {

                e.stopPropagation();

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

            }
        );

        titleInput.focus();

    }

    // ---------------------------------------------------------
    // ARCHIVE
    // ---------------------------------------------------------

    function archiveNote(index) {

        const note = notesData[index];

        if (!note) return;

        note.archived = true;
        note.trashed = false;

        saveNotes();

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    }

// ---------------------------------------------------------
// CUSTOM DELETE CONFIRMATION
// ---------------------------------------------------------

let noteToDeleteIndex = null;

function showNoteDeleteConfirm(index) {

    noteToDeleteIndex = index;

    const overlay =
        document.getElementById("noteConfirmOverlay");

    if (overlay) {
        overlay.classList.add("active");
    }

}

function closeNoteDeleteConfirm() {

    noteToDeleteIndex = null;

    const overlay =
        document.getElementById("noteConfirmOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

}

document.addEventListener("click", function (e) {

    if (e.target.id === "noteConfirmCancel") {

        closeNoteDeleteConfirm();

    }

    if (e.target.id === "noteConfirmDelete") {

        const index = noteToDeleteIndex;

        closeNoteDeleteConfirm();

        if (index === null) return;

        const note = notesData[index];

        if (!note) return;

        note.trashed = true;
        note.archived = false;

        saveNotes();

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    }

});

    // ---------------------------------------------------------
    // MOVE TO TRASH
    // ---------------------------------------------------------

    function moveToTrash(index) {

        const note = notesData[index];

        if (!note) return;

        showNoteDeleteConfirm(index);
return;

        note.trashed = true;
        note.archived = false;

        saveNotes();

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    }

    // ---------------------------------------------------------
    // RESTORE
    // ---------------------------------------------------------

    function restoreNote(index) {

        const note = notesData[index];

        if (!note) return;

        note.trashed = false;
        note.archived = false;

        saveNotes();

        selectedCategory = "all";

        sideItems.forEach(btn =>
            btn.classList.remove("active")
        );

        const notesButton =
            document.querySelector(
                '.keep-side-item[data-category="all"]'
            );

        if (notesButton) {
            notesButton.classList.add("active");
        }

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    }

// ---------------------------------------------------------
// PERMANENT DELETE
// ---------------------------------------------------------

let noteToPermanentDeleteIndex = null;

function permanentDeleteNote(index) {

    noteToPermanentDeleteIndex = index;

    const overlay =
        document.getElementById(
            "permanentDeleteConfirmOverlay"
        );

    if (overlay) {
        overlay.classList.add("active");
    }

}


// ---------------------------------------------------------
// PERMANENT DELETE CONFIRMATION
// ---------------------------------------------------------

document.addEventListener("click", function (e) {

    // CANCEL
    if (
        e.target.id ===
        "permanentDeleteConfirmCancel"
    ) {

        const overlay =
            document.getElementById(
                "permanentDeleteConfirmOverlay"
            );

        if (overlay) {
            overlay.classList.remove("active");
        }

        noteToPermanentDeleteIndex = null;

    }


    // CONFIRM DELETE
    if (
        e.target.id ===
        "permanentDeleteConfirmDelete"
    ) {

        const index =
            noteToPermanentDeleteIndex;

        const overlay =
            document.getElementById(
                "permanentDeleteConfirmOverlay"
            );

        if (overlay) {
            overlay.classList.remove("active");
        }

        noteToPermanentDeleteIndex = null;

        if (index === null) return;

        const note = notesData[index];

        if (!note) return;

        notesData.splice(index, 1);

        saveNotes();

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    }

});

    // ---------------------------------------------------------
    // SEARCH
    // ---------------------------------------------------------

    if (notesSearch) {

        notesSearch.addEventListener(
            "input",
            function () {

                renderNotes(this.value);

            }
        );

    }

    // ---------------------------------------------------------
    // CLEAR SEARCH
    // ---------------------------------------------------------

    if (clearNotesSearch) {

        clearNotesSearch.addEventListener(
            "click",
            function () {

                if (!notesSearch) return;

                notesSearch.value = "";

                renderNotes();

                notesSearch.focus();

            }
        );

    }

    // ---------------------------------------------------------
    // REFRESH
    // ---------------------------------------------------------

    const refreshButton =
        document.querySelector(
            '.keep-icon-btn[title="Refresh"]'
        );

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                closeAllZoom();

                notesData =
                    JSON.parse(
                        localStorage.getItem(
                            "reywalkerNotes"
                        )
                    ) || [];

                renderNotes(
                    notesSearch
                        ? notesSearch.value
                        : ""
                );

            }
        );

    }

    // ---------------------------------------------------------
    // SETTINGS
    // ---------------------------------------------------------

    const settingsButton =
        document.querySelector(
            '.keep-icon-btn[title="Settings"]'
        );

    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            function () {

                alert(
                    "Notes Settings\n\n" +
                    "• Your notes are saved automatically.\n" +
                    "• Deleted notes go to Trash.\n" +
                    "• Archived notes are stored in Archive."
                );

            }
        );

    }

    // ---------------------------------------------------------
    // GLOBAL ESCAPE FOR ZOOM
    // ---------------------------------------------------------

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {

                closeAllZoom();

            }

        }
    );

    // ---------------------------------------------------------
    // MAKE RENDER NOTES AVAILABLE GLOBALLY
    // ---------------------------------------------------------

    window.renderNotes = function () {

        renderNotes(
            notesSearch
                ? notesSearch.value
                : ""
        );

    };

   // ---------------------------------------------------------
// INITIAL LOAD
// ---------------------------------------------------------

renderNotes();
loadNotesFromFirebase();

})();


// FOOTER REYWALKER → ABOUT
const footerReyWalker = document.getElementById("footerReyWalker");

if (footerReyWalker) {

    footerReyWalker.addEventListener("click", function(e) {

        e.preventDefault();

        const aboutItem = document.querySelector(
            '.menu-item[data-section="about"]'
        );

        if (aboutItem) {
            aboutItem.click();
        }

    });

}