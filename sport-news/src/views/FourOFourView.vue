<template>
    <div id="notfound">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet">
		<div class="notfound">
			<div class="notfound-404">
				<h1 class="text-zinc-800 dark:text-zinc-300">Oops!</h1>
			</div>
			<h2 class="text-zinc-700 dark:text-zinc-300">404 - Page not found</h2>
			<p class="text-zinc-700 dark:text-zinc-300">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<router-link class="px-4 py-2.5 text-zinc-100 bg-teal-500 rounded" :to="{ name: 'home' }">Go To Homepage</router-link>
		</div>
	</div>
</template>

<style scoped>
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 45%;
  -webkit-transform: translate(-50%, -45%);
      -ms-transform: translate(-50%, -45%);
          transform: translate(-50%, -45%);
}

.notfound {
  max-width: 410px;
  width: 100%;
  text-align: center;
}

.notfound .notfound-404 {
  height: 280px;
  position: relative;
  z-index: -1;
}

.notfound .notfound-404 h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 230px;
  margin: 0px;
  font-weight: 900;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
}


.notfound h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 35px;
}

.notfound p {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 0px;
}

@media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      height: 142px;
    }
    .notfound .notfound-404 h1 {
      font-size: 112px;
    }
}
</style>