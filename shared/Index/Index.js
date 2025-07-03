// Inject header
fetch('/header/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        const cssId = 'header-style';

        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = '/header/header.css';
            document.head.appendChild(link);
        }

        // Attach click event listeners after header is loaded
        document.querySelectorAll('a[data-page]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                console.log(
                    page
                )
                loadPageContent(page);
            });
        });
    });




    function loadPageContent(page) {
    const path = `/${page}/${page}.html`// Example: ../about/about.html

    fetch(path)
        .then(res => res.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;

            // ✅ Remove mainindex.css if not on home
            const mainIndexCSS = document.getElementById('main-index-css');
            if (mainIndexCSS && page !== 'home') {
                mainIndexCSS.remove();
            }

            // ✅ Always remove previous dynamic page CSS
            const dynamicCSS = document.querySelector('link[data-dynamic-css]');
            if (dynamicCSS) dynamicCSS.remove();

            // ✅ Inject CSS if not already added
            const cssId = `${page}-css`
            if (!document.getElementById(cssId)) {
                const link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.href = `/${page}/${page}.css` // Example: ../about/about.css
                link.setAttribute('data-dynamic-css', 'true');
                document.head.appendChild(link);
            }
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML = '<p>Page not found</p>';
            console.error('Page load failed:', err);
        });
}

// function loadPageContent(page) {
//     const path = `../${page}/${page}.html`; // Example: ../about/about.html

//     fetch(path)
//         .then(res => res.text())
//         .then(data => {
//             document.getElementById('main-content').innerHTML = data;

//             const mainIndexCSS = document.getElementById('main-index-css');
//             if (mainIndexCSS && page !== 'home') {
//                 mainIndexCSS.remove();
//             }
//             else{
//                 const dynamicCSS = document.querySelector('link[data-dynamic-css]');
//             if (dynamicCSS) dynamicCSS.remove();
//             }
            
//             // Inject CSS if not already added

//             const cssId = `${page}-css`;
//             if (!document.getElementById(cssId)) {
//                 const link = document.createElement('link');
//                 link.id = cssId;
//                 link.rel = 'stylesheet';
//                 link.href = `../${page}/${page}.css`; // Example: ../about/about.css
//                 link.setAttribute('data-dynamic-css', 'true');
//                 document.head.appendChild(link);
//             }
//         })
//         .catch(err => {
//             document.getElementById('main-content').innerHTML = '<p>Page not found</p>';
//             console.error('Page load failed:', err);
//         });
// }







// Inject footer
fetch('/footer/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        const cssId = 'footer-style';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = '/footer/footer.css';
            document.head.appendChild(link);
        }
    });