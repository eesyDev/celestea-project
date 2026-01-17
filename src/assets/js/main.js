// src/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lazy Load Images ---
    const loadImages = () => {
        // Ждем чуть-чуть, как в оригинале
        setTimeout(() => {
            const images = document.querySelectorAll('img[data-src]');

            images.forEach(oldImg => {
                const src = oldImg.getAttribute('data-src');
                const srcset = oldImg.getAttribute('data-srcset');
                const classes = oldImg.className;
                const alt = oldImg.getAttribute('alt') || '';
                const title = oldImg.getAttribute('title') || '';

                if (src) {
                    const newImg = new Image();
                    // Скрываем сразу
                    newImg.style.display = 'none';
                    
                    newImg.onload = () => {
                        // Эффект появления
                        newImg.style.display = ''; // сброс display: none
                        // Добавляем класс анимации (если он есть в CSS .transition)
                        // В оригинале был fadeIn jQuery, тут заменим на CSS класс
                        newImg.style.opacity = '0';
                        newImg.style.transition = 'opacity 0.4s';
                        setTimeout(() => {
                             newImg.style.opacity = '1';
                        }, 10);
                        
                        // Если есть родитель .bg, даем ему класс
                        const bgParent = oldImg.closest('.bg');
                        if (bgParent) bgParent.classList.add('loaded');

                        setTimeout(() => {
                            newImg.classList.add('transition');
                        }, 400);
                    };

                    if (srcset && srcset.length > 3) {
                        newImg.srcset = srcset;
                    }
                    newImg.src = src;
                    newImg.alt = alt;
                    newImg.title = title;
                    newImg.className = classes;

                    // Заменяем старый img на новый
                    oldImg.replaceWith(newImg);
                }
            });
        }, 150);
    };

    // Запускаем
    loadImages();


    // --- 2. Поиск (Header Search) ---
    const searchContainer = document.querySelector('.header__search');
    
    if (searchContainer) {
        // Сохраняем SVG иконку, чтобы вернуть её потом
        const originalContent = searchContainer.innerHTML; 

        searchContainer.addEventListener('click', (e) => {
            // Если инпута еще нет
            if (!searchContainer.querySelector('input')) {
                // Создаем форму через шаблонную строку (так проще, чем createElement)
                searchContainer.innerHTML = `
                    <form class="header__search-form">
                        <input type="text" class="header__search-input" placeholder="Поиск...">
                        <button type="submit" class="header__search-submit">
                           Go
                        </button>
                    </form>
                `;
                
                const input = searchContainer.querySelector('input');
                const form = searchContainer.querySelector('form');
                
                input.focus();

                form.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    console.log('Search query:', input.value);
                });
            }
        });

        // Закрытие при клике вне
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && searchContainer.querySelector('form')) {
                searchContainer.innerHTML = originalContent;
            }
        });

        // Закрытие при Escape
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && searchContainer.querySelector('form')) {
                searchContainer.innerHTML = originalContent;
            }
        });
    }


    // --- 3. Бургер Меню ---
    const burger = document.querySelector('.burger');
    const slideMenu = document.querySelector('.slide-menu');
    const body = document.body;
    let scrollPosition = 0;

    if (burger && slideMenu) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();
            burger.classList.toggle('open');
            slideMenu.classList.toggle('open');

            if (burger.classList.contains('open')) {
                // Блокируем скролл
                scrollPosition = window.scrollY;
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.top = `-${scrollPosition}px`;
                body.style.width = '100%';
            } else {
                // Разблокируем
                body.style.overflow = '';
                body.style.position = '';
                body.style.top = '';
                body.style.width = '';
                window.scrollTo(0, scrollPosition);
            }
        });
    }


    // --- 4. Swiper Slider ---
    // ВАЖНО: Swiper должен быть импортирован или подключен в head
    // Проверяем, загрузился ли Swiper
    if (typeof Swiper !== 'undefined') {
        try {
            const blogSlider = new Swiper('.blog-slider', {
                slidesPerView: 1,
                spaceBetween: 36,
                pagination: {
                    el: ".swiper-pagination.blog-pagination",
                    type: "bullets",
                    clickable: true,
                },
                breakpoints: {
                    1024: { slidesPerView: 3 },
                    620: { slidesPerView: 2 }
                }
            });
        } catch (err) {
            console.log('Swiper error:', err);
        }
    }
});