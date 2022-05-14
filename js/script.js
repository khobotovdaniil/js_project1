/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Одержимость",
            "Логан",
            "Лига справедливости",
            "Скотт Пилигрим против...",
            "Ла-ла лэнд",             
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

            
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }; 
    
    const makeChanges = () => {
        genre.textContent = 'драма';     
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };
    
    const generateFilmList = (films, parent) => {  
        parent.innerHTML = "";
        sortArr(films);
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        parent.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', event => {
                btn.parentElement.remove();
                films.splice(i, 1);
                generateFilmList(films, parent);   
            });
        });
    };

    const LowerCase = (arr) => {
        arr.forEach ((film, i) => {
            arr[i] = film.toLowerCase();
        });
    };


    deleteAdv(adv);
    makeChanges();
   
    LowerCase(movieDB.movies);
    generateFilmList(movieDB.movies, movieList);    
    
    addForm.addEventListener('submit', event => {
        event.preventDefault();
        let newFilm = addInput.value;
        if (newFilm) {  
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 21)}...`;
            } 

            movieDB.movies.push(newFilm.toLowerCase());
    
            if (checkbox.checked) {
                console.log('Добавляем любимый фильм');
            }
    
            sortArr(movieDB.movies);
            generateFilmList(movieDB.movies, movieList);    
            event.target.reset();        
        }
    });

});



