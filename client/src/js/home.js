const global = require('./global.js');

module.exports = {
   getView: () =>
      `<div class="homeItems">
         <div class="jumbotron m-3">
            <div class="row">
               <div class="col-md-8">
                  <div class="intro">
                     <h2>Chelas Open VIDeogame Application</h2>
                     <p>Never miss any detail of your favourite game and do not forget those you have already played!<br />
                        <br /><em>Made in ISEL.</em>
                     </p>
                  </div>
               </div>
               <div class="col-10 col-sm-4 offset-0">
                  <img class="align-items-center device" src='${global.logo}' style="width: 300px;" />
                  <div class="d-none d-md-block"></div>
               </div>
            </div>
         </div>
         <div class="jumbotron features m-3">
            <div class="row">
               <div class="col mb-5">
                  <h2 class="text-center">Features</h2>
                  <p class="text-center">Take a peek at all that COVIDA has to offer</p>
               </div>
            </div>
            <div class="row">
               <div class="col">
                  <div class="card text-white bg-primary mb-3 h-100 p-3">
                     <i class="fas fa-gamepad icon featuresIcon"></i>
                     <h3 class="name">IGDB</h3>
                     <p class="description">Based on The IGDB API.</p>
                  </div>
               </div>
               <div class="col">
                  <div class="card text-white bg-primary mb-3 h-100 p-3">
                     <i class="fas fa-money-bill-alt icon featuresIcon"></i>
                     <h3 class="name">Always Free</h3>
                     <p class="description">COVIDA is, and always will be, completely free.</p>
                  </div>
               </div>
               <div class="col">
                  <div class="card text-white bg-primary mb-3 h-100 p-3">
                     <i class="far fa-user-circle icon featuresIcon"></i>
                     <h3 class="name">Customizable </h3>
                     <p class="description">Create groups with your favorite games.</p>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer-basic text-center">
            <footer>
               <div class="container">
                  <a class="btn btn-primary btn-circle btn-sm footerItem" href="https://github.com/beatrizctgoncalves">
                  <i class="fab fa-github footerIcon"></i></a>
                  <a class="btn btn-primary btn-circle btn-sm footerItem" href="https://www.linkedin.com/in/beatriz-gon%C3%A7alves-a28716195/">
                  <i class="fab fa-linkedin footerIcon"></i></a>
               </div>
               <p class="copyright">ISEL-PI-G08 © 2021</p>
            </footer>
         </div>
      </div>`,

   authenticationRequired : false,

   run: () => { }
};
