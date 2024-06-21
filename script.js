function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
}

// Function to toggle the theme and store the new theme in localStorage
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Change the button text based on the new theme
    document.getElementById('theme-toggle').innerText = newTheme === 'light' ? 'Dark' : 'Light';
}

// Set the initial theme based on the value in localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Set the initial text of the button based on the saved theme
document.getElementById('theme-toggle').innerText = savedTheme === 'light' ? 'Dark' : 'Light';

// Event listener for button click to toggle theme
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);


function loadChaptersmenu() {
    const data = null;
    const xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = true;
    const chapter_menu = document.getElementById('chapter-menu');
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState === XMLHttpRequest.DONE) {
            if (xhr3.status === 200) {
                // Parse the JSON response
                var jsonResponse = JSON.parse(xhr3.responseText);
                // console.log(jsonResponse);
                jsonResponse.forEach(element => {
                    chapter_menu.innerHTML += `<li class="dropdown-item" onclick="openChap(${element.chapter_number})">Chapter - ${element.chapter_number}
                    </li>
            `;
                });
            } else {
                console.error('Error:', xhr3.statusText);
            }
        }
    };
    xhr3.open('GET', `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/`);
    xhr3.setRequestHeader('x-rapidapi-key', '2fbd54d409mshadad06cdfd55ed6p1b83c4jsn078e44adfacf');
    xhr3.setRequestHeader('x-rapidapi-host', 'bhagavad-gita3.p.rapidapi.com');
    xhr3.send(data);
}
function loadVersemenu() {
    const data = null;
    const xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = true;
    const chapter_menu = document.getElementById('chapter-menu');
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState === XMLHttpRequest.DONE) {
            if (xhr3.status === 200) {
                // Parse the JSON response
                var jsonResponse = JSON.parse(xhr3.responseText);
                jsonResponse.forEach(element => {
                    chapter_menu.innerHTML += `<li id="chap-verse-menu" onclick="showVerse(${element.chapter_number})">
                               Chapter - ${element.chapter_number}
                        </li> 
                        `;
                });
            } else {
                console.error('Error:', xhr3.statusText);
            }
        }
    };
    xhr3.open('GET', `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/`);
    xhr3.setRequestHeader('x-rapidapi-key', '2fbd54d409mshadad06cdfd55ed6p1b83c4jsn078e44adfacf');
    xhr3.setRequestHeader('x-rapidapi-host', 'bhagavad-gita3.p.rapidapi.com');
    xhr3.send(data);
}

function showVerse(chap) {
    const data = null;
    const xhr4 = new XMLHttpRequest();
    xhr4.withCredentials = true;
    const verse_menu = document.getElementById('verse-menu');
    const verse_chap = document.getElementById('verse-chap');
    xhr4.onreadystatechange = function () {
        if (xhr4.readyState === XMLHttpRequest.DONE) {
            if (xhr4.status === 200) {
                // Parse the JSON response
                var jsonResponse = JSON.parse(xhr4.responseText);
                verse_chap.innerText = `Chapter ${chap}`;
                verse_menu.innerHTML = "";
                jsonResponse.forEach(element => {
                    verse_menu.innerHTML += `<li id="chap-verse-menu" onclick="openVerse(${element.verse_number})">
                               ${element.verse_number}
                        </li> 
                        `;
                });
            } else {
                console.error('Error:', xhr4.statusText);
            }
        }
    };
    xhr4.open('GET', `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chap}/verses/`);
    xhr4.setRequestHeader('x-rapidapi-key', '2fbd54d409mshadad06cdfd55ed6p1b83c4jsn078e44adfacf');
    xhr4.setRequestHeader('x-rapidapi-host', 'bhagavad-gita3.p.rapidapi.com');
    xhr4.send(data);
}



function loadData() {
    let loadingBar = document.getElementById('loadingBar');
    let loadingBarContainer = document.getElementById('loadingBarContainer');
    let main = document.getElementById('main');
    let loading = document.getElementById('loading-img');
    loading.style.display = "flex";
    main.style.display = "none";
    let width = 0;
    const data = null;
    const xhr1 = new XMLHttpRequest();
    xhr1.withCredentials = true;
    const xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;
    const chapter_no = document.getElementById('chapter-no');
    const chapter_name = document.getElementById('chapter-name');
    const chapter_content = document.getElementById('chapter-content');
    const total_verse = document.getElementById('total-verse');
    const verse_data = document.getElementById('verse-no-content');
    xhr1.addEventListener('readystatechange', function () {
        if (this.readyState === this.LOADING) {
            width = 25;
            loadingBar.style.width = width + '%';
        } else if (this.readyState === this.DONE) {
            try {
                main.style.display = "block";
                loading.style.display = "none";
                const jsonResponse = JSON.parse(this.responseText);
                chapter_no.innerText = "CHAPTER " + jsonResponse.chapter_number;
                chapter_name.innerText = jsonResponse.name_translated;
                chapter_content.innerText = jsonResponse.chapter_summary;
                width = 50;
                loadingBar.style.width = width + '%';
            } catch (e) {
                // chapter_content.innerText = "Error: Failed to parse JSON response.";
            }
        }
    });
    xhr2.addEventListener('readystatechange', function () {
        if (this.readyState === this.LOADING) {
            width = 75;
            loadingBar.style.width = width + '%';
        } else if (this.readyState === this.DONE) {
            try {
                const jsonResponse = JSON.parse(this.responseText);
                verse_data.innerHTML = "";
                total_verse.innerText = jsonResponse.length + " VERSES";
                const desiredLanguage = 'english';
                jsonResponse.forEach(element => {
                    let firstTranslationDescription = "";
                    if (element.translations && element.translations.length > 0) {
                        const matchingTranslation = element.translations.find(translation => translation.language === desiredLanguage);
                        if (matchingTranslation) {
                            firstTranslationDescription = `<p>${matchingTranslation.description}</p>`;
                        }
                    }
                    const verseItem = `
                        <li class="d-flex align-items-center">
                            <div style="width:200px">
                                 <h6 style="color: orangered;">VERSE ${element.verse_number}</h6>
                            </div>
                            <div id="verse-content">
                                 ${firstTranslationDescription}   
                            </div>
                        </li>`;
                    verse_data.innerHTML += verseItem;
                });
                width = 100;
                loadingBar.style.width = width + '%';
                setTimeout(() => {
                    loadingBarContainer.style.display = 'none';
                }, 200); // Optional delay to allow users to see the completed bar
            } catch (e) {
                // verse_data.innerText = "Error: Failed to parse JSON response.";
            }
        }
    });
    xhr1.open('GET', `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chap_no}/`);
    xhr2.open('GET', `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chap_no}/verses/`);
    xhr1.setRequestHeader('x-rapidapi-key', '2fbd54d409mshadad06cdfd55ed6p1b83c4jsn078e44adfacf');
    xhr1.setRequestHeader('x-rapidapi-host', 'bhagavad-gita3.p.rapidapi.com');
    xhr2.setRequestHeader('x-rapidapi-key', '2fbd54d409mshadad06cdfd55ed6p1b83c4jsn078e44adfacf');
    xhr2.setRequestHeader('x-rapidapi-host', 'bhagavad-gita3.p.rapidapi.com');
    xhr1.send(data);
    xhr2.send(data);
}
function openChap(chap) {
    window.location.href = `chapter.html?chapter=${chap}`;
}
function openVerse(verse) {
    window.location.href = `verse.html?chapter=${chap_no}&verse=${verse}`;
}


function hidePage() {
    document.querySelector('.overlay').style.display = 'none';
    document.getElementById('main-panel').style.display = "none";
}
