"use strict";

window.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form"),
		  inputPhone = document.querySelector("input[name='phone']"),
		  inputEmail = document.querySelector("input[name='email']"),
		  result = document.querySelector(".result"),
		  inputs = document.querySelectorAll(".form-input"),
		  formSent = localStorage.getItem("formSent"),
		  button = document.querySelector("button[type='submit']"),
		  buttonDisabled = document.querySelector(".form-button.--disabled");

	if (formSent) { 
		button.classList.add("hidden");
		buttonDisabled.classList.remove("hidden");
	}

	const focusMainLabel = (item) => {
		item.classList.remove("scale-1");
		item.classList.add("scale-65");
	};
	const focusHelpLabel = (item) => {
		item.classList.remove("opacity-0");
		item.classList.add("opacity-75");
	};

	const blurMainLabel = (item) => {
		item.classList.remove("scale-65");
		item.classList.add("scale-1");
	};
	const blurHelpLabel = (item) => {
		item.classList.remove("opacity-75");
		item.classList.add("opacity-0");
	};

	/* Google Analytics */
	let event_name = "null";

	inputs.forEach(item => {
		item.addEventListener(
			"focus",
			(e) => {
				const inputParent = e.target.parentElement,
					  mainLabel = inputParent.querySelector(".form-input-label.--main"),
					  helpLabel = inputParent.querySelector(".form-input-label.--help");

				focusMainLabel(mainLabel);
				focusHelpLabel(helpLabel);
			},
			true
		);

		item.addEventListener(
			"blur",
			(e) => {
				const inputParent = e.target.parentElement,
					  mainLabel = inputParent.querySelector(".form-input-label.--main"),
					  helpLabel = inputParent.querySelector(".form-input-label.--help");

				if (e.target.value === "") {
					blurMainLabel(mainLabel);
				}

				blurHelpLabel(helpLabel);
			},
			true
		);
	});

	// Input validation

	const isPhoneValid = (phone) => {
		const regex = /^\+?\d{2,4}?[-.\s]?\d[-.\s]?\d{2,3}[-.\s]?\d{2,3}[-.\s]?\d{1,3}$/;
		return regex.test(phone);
	};
	const isEmailValid = (email) => {
		const regex = /^\S+@\S+\.\S+$/;
		return regex.test(email);
	};
	
	const focusOutline = (input) => {
		input.classList.add("outline-active");
	};
	const blurOutline = (input) => {
		input.classList.remove("outline-active");
	};
		
	const checkPhone = () => {
		let valid = false;

		if (!isPhoneValid(inputPhone.value.trim()) && inputPhone.value !== "") {
			focusOutline(inputPhone);
		} else {
			blurOutline(inputPhone);
			valid = true;
		}

		return valid;
	};

	const checkEmail = () => {
		let valid = false;

		if (!isEmailValid(inputEmail.value.trim()) && inputEmail.value !== "") {
			focusOutline(inputEmail);
		} else {
			blurOutline(inputEmail);
			valid = true;
		}

		return valid;
	};

	// Form

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		inputs.forEach(item => {
			blurOutline(item);
		});

		let isPhoneValid = checkPhone(),
			isEmailValid = checkEmail(),
			isFormValid = isPhoneValid && isEmailValid;
		
		if (isFormValid) {
			const formData = new FormData(form),
				  object = Object.fromEntries(formData),
				  json = JSON.stringify(object),
				  resultContainer = document.querySelector(".result-container");

			result.innerHTML = "Oczekuję na odpowiedź serwera...";

			resultContainer.classList.remove("opacity-0", "-z-10");
			resultContainer.classList.add("opacity-1", "z-10");

			formData.forEach((value, key) => {
				object[key] = value;
			});

			fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: json,
			})
			.then(async (response) => {
				let json = await response.json();

				if (response.status == 200) {
					/* Google Analytics */
					event_name = "contact_form_submit";

					result.innerHTML = "Dziękuję za zgłoszenie!\u000A\u000ASkontaktuję się z Tobą w&nbsp;możliwie najkrótszym czasie.";

					resultContainer.classList.remove("opacity-0", "-z-10");
					resultContainer.classList.add("opacity-1", "z-10");

					form.setAttribute("disabled", true);

					localStorage.setItem("formSent", true);
					button.classList.add("hidden");
					buttonDisabled.classList.remove("hidden");

					inputs.forEach(item => {
						item.setAttribute("disabled", true);
					});
				} else {
					result.innerHTML = json.message;

					resultContainer.classList.remove("opacity-0", "-z-10");
					resultContainer.classList.add("opacity-1", "z-10");
				}
			})
			.catch(error => {
				result.innerHTML = "Ups! Nie udało się połączyć się z serwerem. Proszę, spróbuj póżniej.\u000A\u000A" + error;
			})
			.then(() => {
				form.reset();
				checkEmail();
				checkPhone();
				inputs.forEach(item => {
					const inputParent = item.parentElement,
						  mainLabel = inputParent.querySelector(".form-input-label.--main"),
						  helpLabel = inputParent.querySelector(".form-input-label.--help");

					blurMainLabel(mainLabel);
					blurHelpLabel(helpLabel);
				});
				setTimeout(() => {
					resultContainer.classList.remove("opacity-1", "z-10");
					resultContainer.classList.add("opacity-0", "-z-10");
				}, 5000);
			});
		}
	});

	const debounce = (fn) => {
		let timeoutId;
		return (...args) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				fn.apply(null, args)
			}, 500);
		};
	};

	form.addEventListener("input", debounce(e => {
		switch (e.target.name) {
			case "phone":
				checkPhone();
				break;
			case "email":
				checkEmail();
				break;
		}
	}));

	// Form security
	
	const formButton = form.querySelector(".form-button"), 
		  body = document.querySelector("body");
  
	function activateForm() {
	  form.setAttribute("action", "https://api.web3forms.com/submit");
	  formButton.removeAttribute("disabled");
	}
  
	body.addEventListener("mousemove", () => activateForm());
	body.addEventListener("touchmove", () => activateForm());
	body.addEventListener("keydown", function (e) {
	  if ((e.key === "Tab") || (e.key === "Enter")) {
		activateForm();
	  }
	});
    
    // Data.json

    let	jsonName = document.querySelectorAll(".json-name"),
        jsonPhone = document.querySelectorAll(".json-phone"),
        jsonEmailName = document.querySelector(".json-email-name"),
        jsonEmailFull = document.querySelectorAll(".json-email-full"),
        jsonTel = document.querySelector(".json-tel"),
        jsonMailTo = document.querySelector(".json-mail-to"),
        jsYear = document.querySelectorAll(".js-year"),
        jsonTitle = document.querySelector(".json-title"),
        bio1 = document.getElementById("bio1"),
        bio2 = document.getElementById("bio2"),
        jsonReviewAuthors = document.querySelectorAll(".reviews-author"),
        jsonReviewAuthorLogos = document.querySelectorAll(".reviews-author-logo"),
        jsonReviewContents = document.querySelectorAll(".reviews-text");

    const setJsYear = () => {
        const date = new Date();
        let year = date.getFullYear();
        return year;
    }

    fetch("assets/data.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        document.title = data.name + " | Ekspert Finansowy ANG";
        jsonEmailName.innerHTML = data.email;

        jsonTel.setAttribute("href", "tel:" + data.phone);
        jsonMailTo.setAttribute("href", "mailto:" + data.email + data.emailDomain);

        jsonName.forEach(item => {
            item.innerHTML = data.name;
        });
        jsonPhone.forEach(item => {
            item.innerHTML = data.phone;
        });
        jsonEmailFull.forEach(item => {
            item.innerHTML = data.email + data.emailDomain;
        });
        jsYear.forEach(item => { 
            item.innerHTML = setJsYear();
        });
        
        if (jsonTitle !== null) {
            jsonTitle.innerHTML = data.title;
            bio1.innerHTML = data.bio1;
            bio2.innerHTML = data.bio2;

            for (let i = 0; i < 12; i++) {
                jsonReviewAuthors[i].innerHTML = data.reviewAuthors[i];
                jsonReviewAuthorLogos[i].innerHTML = data.reviewAuthors[i].slice(0, 1);
                jsonReviewContents[i].innerHTML = data.reviewContents[i];
            }
        }
    })
    .catch(err => {
        alert(err);
    });

    // Reviews

    let reviews = document.querySelectorAll(".reviews"),
        previous = document.querySelectorAll(".--previous"),
        next = document.querySelectorAll(".--next"),
        counter = 0;

    function hideReviews() {
        reviews.forEach(item => {
            item.classList.remove("flex");
            item.classList.add("hidden");
        });
    }

    function nextReview() {
        hideReviews();
        if(counter === 11) {
            reviews[0].classList.remove("hidden");
            reviews[0].classList.add("flex");
            counter = 0;
        } else {
            reviews[counter + 1].classList.remove("hidden");
            reviews[counter + 1].classList.add("flex");
            ++counter;
        }
    }

    function previousReview() {
        hideReviews();
        if(counter === 0) {
            reviews[11].classList.remove("hidden");
            reviews[11].classList.add("flex");
            counter = 11;
        } else {
            reviews[counter - 1].classList.remove("hidden");
            reviews[counter - 1].classList.add("flex");
            --counter;
        }
    }

    previous.forEach(item => {
        item.addEventListener("click", () => { previousReview() });
    });
    next.forEach(item => {
        item.addEventListener("click", () => { nextReview() });
    });	
});

window.addEventListener("load", () => {
	const loader = document.getElementById("loader-container"),
		  trigger = document.getElementById("trigger"),
		  menuOpen = document.querySelector(".menu-button"),
		  menuClose = document.querySelector(".menu-button.--close"),
		  menu = document.querySelector(".menu"),
		  mobileFormButton = document.getElementById("mobile-form--button"),
		  mobileFormButtonIcon = document.getElementById("mobile-form--button-icon"),
		  mobileFormBg = document.getElementById("mobile-form--bg"),
		  mobileForm = document.getElementById("mobile-form"),
		  headerLinks = document.querySelectorAll(".header-link"),
		  disableCookiesButton = document.getElementById("disable"),
		  confirmCookiesButton = document.getElementById("confirm"),
		  cookieWindow = document.getElementById("cookie-window"),
          iframe = document.getElementById("map"),
		  cookiesDisabled = sessionStorage.getItem("cookiesDisabled"),
		  cookiesConfirmed = sessionStorage.getItem("cookiesConfirmed");

	const showMenu = () => {
		menu.classList.remove("max-xl:hidden");
	}
	const hideMenu = () => {
		menu.classList.add("max-xl:hidden");
	}
	const showMobileForm = () => {
		mobileFormBg.classList.remove("absolute");
		mobileFormBg.classList.add("fixed");
		mobileForm.classList.remove("max-xl:hidden");
		mobileFormButtonIcon.src = "assets/img/icon--close.svg";
	}
	const hideMobileForm = () => {
		mobileFormButtonIcon.src = "assets/img/icon--phone.svg";
		mobileForm.classList.add("max-xl:hidden");
		mobileFormBg.classList.remove("fixed");
		mobileFormBg.classList.add("absolute");
	}

	const disableCookies = () => {
        let cookies = document.cookie.split("; ");

        for (let i = 0; i < cookies.length; i++) {
            let d = window.location.hostname.split(".");

            while (d.length > 0) {
                let p = location.pathname.split("/"), 
                    cookieBase = encodeURIComponent(cookies[i].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + d.join(".") + " ;path=";

                document.cookie = cookieBase + "/";

                while (p.length > 0) {
                    document.cookie = cookieBase + p.join("/");
                    p.pop();
                };
                
                d.shift();
            }
        }
	}

	if (cookiesDisabled) { 
		disableCookies(); 
		cookieWindow.classList.add("hidden"); 
	}
	if (cookiesConfirmed) { cookieWindow.classList.add("hidden"); }

	loader.classList.add("unload");

	menuOpen.addEventListener("click", () => { showMenu() });
	menuClose.addEventListener("click", () => { hideMenu() });

	headerLinks.forEach(item => {
		item.addEventListener("click", () => { hideMenu() });
	});

	mobileFormButton.addEventListener("click", () => {
		mobileForm.classList.contains("max-xl:hidden") ? showMobileForm() : hideMobileForm();
	});

	disableCookiesButton.addEventListener("click", () => {
		disableCookies();
		cookieWindow.classList.add("hidden");
		sessionStorage.setItem("cookiesDisabled", true);
	});

	confirmCookiesButton.addEventListener("click", () => {
		cookieWindow.classList.add("hidden");
		sessionStorage.setItem("cookiesConfirmed", true);
	});

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const circles = document.querySelectorAll(".circle"),
				  counters = document.querySelectorAll(".stats-number"),
				  speed = 180;
		
			if (entry.isIntersecting) {
				counters.forEach(counter => {
					const animate = () => {
						const value = +counter.getAttribute("data-target"),
							  data = +counter.innerText,
							  time = value / speed;

						if(data < value) {
							counter.innerText = Math.ceil(data + time);
							if (value < 20) { 
								setTimeout(animate, 180);
							} else {
								setTimeout(animate, 20);
							}
						} else {
							counter.innerText = value;
						}
					}
					animate();
				});
				circles.forEach(item => {
					item.classList.add("circle-animation");
				});
				return;
			}
		});
	});

	if (trigger !== null) { observer.observe(trigger); }

	if (iframe !== null) {
		iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9771.966273609174!2d21.0130558!3d52.2435368!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd6848ce0bab%3A0xbc9d028629966da9!2sKlaudia%20Sa%C5%82apa%20Ekspert%20Finansowy!5e0!3m2!1spl!2spl!4v1682842491353!5m2!1spl!2spl";
	}

	// Google Analytics

	window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-CLCK7LHPZ3");
});