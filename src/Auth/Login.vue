<template>
  <div class="container p-5 mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5 shadow p-3 mb-5 bg-body-tertiary rounded border-0">
          <div class="card-body">
            <h3 class="card-title text-center mb-5">Login</h3>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" autocomplete="off" />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="off" />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="d-grid gap-2 mt-5">
              <button class="btn btn-primary" type="button"><i class="bi bi-box-arrow-in-right"></i> Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
