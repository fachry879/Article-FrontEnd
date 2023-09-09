<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <router-link :to="{ name: 'Create Article' }" class="nav-link" aria-current="page">Create Article</router-link> -->
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
          <a href="#" class="btn btn-success">SANTRIKODING.COM</a>
        </ul>
      </div>
    </div>
  </nav>
</template>
