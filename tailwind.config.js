/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.{html,js,ejs}"],
	theme: {
		screens: {
			tablet: "640px",
			laptop: "1024px",
			desktop: "1420px"
		},
		extend: {
			fontFamily: {
				laBelleAurore: ["La Belle Aurore", "serif"],
				poppins: ["Poppins Regular", "sans-serif"]
			},
			colors: {
				mantis: {
					primary: "#1677ff",
					hover: "#e6f4ff",
					background: "#fafafa"
				}
			},
			container: {
				center: true,
				padding: "1rem"
			},
			backgroundImage: {
				slope: "url('/images/hassaan-here-ckyTKYVGlXk-unsplash.jpg')",
				mountains: "url('/images/patrick-hendry-rGoxQdG6GXc-unsplash.jpg')",
				water: "url('/images/jack-b-o1radglopDA-unsplash.jpg')",
				waves: "url('/images/richard-horvath-cPccYbPrF-A-unsplash.jpg')",
				blurred: "url('/images/mohammad-alizade-XgeZu2jBaVI-unsplash.jpg')"
			}
		}
	}
};
