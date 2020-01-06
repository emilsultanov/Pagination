
const parameters = {
   totalData: 1000,
   dataPerPage: 50,
   paginationItem: 5,
};


let index = 0;

let pagination__buttons = document.querySelectorAll(".pagination__btn[data-pagination-direct]");
for (button of pagination__buttons) {
   button.addEventListener('click', pagination__buttons_hundler);
}


function pagination__buttons_hundler() {

   let pagination__direct = this.dataset.paginationDirect;
   let pagination__items = document.querySelectorAll('.pagination__item');

   if (pagination__direct === 'next') {

      for (let i = 0; i < pagination__items.length; i++) {
         if (pagination__items[i].classList.contains('pagination__item_active') && pagination__items[i].nextElementSibling.classList.contains('pagination__item')) {
            pagination__items[i].classList.remove('pagination__item_active');
            pagination__items[i].nextElementSibling.classList.add('pagination__item_active');
            break;
         }
         else if (pagination__items[i].classList.contains('pagination__item_active') && pagination__items[i].nextElementSibling.classList.contains('threeDotsNext')) {
            createPagination(parameters, index, pagination__direct);
            break;
         }
      }
   }
   else if (pagination__direct === 'prev') {

      for (let i = 0; i < pagination__items.length; i++) {
         if (pagination__items[i].classList.contains('pagination__item_active') && pagination__items[i].previousElementSibling.classList.contains('pagination__item')) {
            pagination__items[i].classList.remove('pagination__item_active');
            pagination__items[i].previousElementSibling.classList.add('pagination__item_active');
            break;
         }
         else if (pagination__items[i].classList.contains('pagination__item_active') && !pagination__items[i].nextElementSibling.classList.contains('threeDotsNext')) {
            createPagination(parameters, index, pagination__direct);
            break;
         }
      }
   }
}


function createPagination(params, start, direct = 'next') {

   const { totalData, dataPerPage, paginationItem } = params;
   const pages = Math.ceil(totalData / dataPerPage);
   let buttons = Array(pages).fill(1).map((e, i) => e + i);


   if (direct === 'next' && start < buttons.length) {

      let array = buttons.slice(start, start + paginationItem);
      updatePagination(array, index, direct, buttons.length, paginationItem);
      index += paginationItem;
   }
   else if (direct === 'prev' && start > paginationItem) {
      index -= paginationItem;
      let array = buttons.slice(start - paginationItem - paginationItem, start - paginationItem);
      updatePagination(array, index, direct, buttons.length, paginationItem);
   }
}
createPagination(parameters, 0);


function updatePagination(arr, i, direction, length, pagesCount) {

   let pagination__list = document.querySelector('.pagination__list');
   let lastChild = document.querySelector('.threeDotsNext');
   let firstChild = document.querySelector('.threeDotsPrev');

   pagination__list.querySelectorAll('.pagination__item').forEach(n => n.remove());


   if (direction === 'next') {

      if (i === pagesCount) {
         firstChild.classList.remove('d-none')
      }
      else if (i === (length - pagesCount)) {
         lastChild.classList.add('d-none');
      }

      for (item of arr) {
         let pagination__item = document.createElement('li');
         let node = document.createTextNode(item);

         pagination__item.appendChild(node);
         pagination__item.classList.add('pagination__item');
         pagination__item.addEventListener('click', pagination__item_hundler);
         pagination__list.insertBefore(pagination__item, lastChild);
      }
      pagination__list.children[2].classList.add('pagination__item_active');
   }

   else if (direction === 'prev') {

      if (i === (length - pagesCount)) {
         lastChild.classList.remove('d-none');
      }
      else if (i === pagesCount) {
         firstChild.classList.add('d-none')
      }

      for (item of arr) {

         let pagination__item = document.createElement('li');
         let node = document.createTextNode(item);

         pagination__item.appendChild(node);
         pagination__item.classList.add('pagination__item');
         pagination__item.addEventListener('click', pagination__item_hundler);
         pagination__list.insertBefore(pagination__item, lastChild);
      }
      pagination__list.children[arr.length + 1].classList.add('pagination__item_active');
   }


};

function pagination__item_hundler() {
   let pagination__list = document.querySelector('.pagination__list');

   Array.from(pagination__list.children).forEach(child => child.classList.remove('pagination__item_active'));
   this.classList.add('pagination__item_active');
}






