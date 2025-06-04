<template>

  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block"
    data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item px-2"><RouterLink to="/" class="nav-link fw-medium" active-class="active">Home</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/ippo" class="nav-link fw-medium" active-class="active">Ippo</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/anime" class="nav-link fw-medium" active-class="active">Anime</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/books" class="nav-link fw-medium" active-class="active">Books</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/poems" class="nav-link fw-medium" active-class="active">Poems</RouterLink></li>
          <li class="nav-item px-2"><RouterLink to="/random" class="nav-link fw-medium" active-class="active">Random</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>

</template>
