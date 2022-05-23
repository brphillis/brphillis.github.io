const toggleBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', function () {
 console.log(sidebar.classList);
 sidebar.classList.toggle('show-sidebar');
});

// learned to use toggle instead of add and remove

closeBtn.addEventListener('click', function () {
 sidebar.classList.remove('show-sidebar');
});