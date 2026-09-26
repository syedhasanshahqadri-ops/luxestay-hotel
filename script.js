// =========================================================
// LUXESTAY — HOTEL BOOKING WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------------------
    // HELPER FUNCTIONS
    // -----------------------------------------------------

    const $ = (selector, parent = document) => {
        return parent.querySelector(selector);
    };

    const $$ = (selector, parent = document) => {
        return [...parent.querySelectorAll(selector)];
    };


    // -----------------------------------------------------
    // NAVBAR
    // -----------------------------------------------------

    const navbar = $("#navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }


    // -----------------------------------------------------
    // MOBILE MENU
    // -----------------------------------------------------

    const menuBtn = $("#menuBtn");
    const navLinks = $("#navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        $$(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }


    // -----------------------------------------------------
    // HERO SLIDER
    // -----------------------------------------------------

    const slides = $$(".hero-slide");
    const dotsContainer = $("#dots");
    const nextSlide = $("#nextSlide");
    const prevSlide = $("#prevSlide");

    let currentSlide = 0;

    if (slides.length && dotsContainer) {

        slides.forEach((slide, index) => {

            const dot = document.createElement("span");

            dot.className = "dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });


        function goToSlide(index) {

            currentSlide =
                (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );
            });

            $$(".dot").forEach((dot, i) => {
                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );
            });
        }


        if (nextSlide) {
            nextSlide.addEventListener("click", () => {
                goToSlide(currentSlide + 1);
            });
        }


        if (prevSlide) {
            prevSlide.addEventListener("click", () => {
                goToSlide(currentSlide - 1);
            });
        }


        // Automatic slider
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 6500);
    }


    // -----------------------------------------------------
    // SCROLL REVEAL ANIMATION
    // -----------------------------------------------------

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // -----------------------------------------------------
    // PRICE RANGE FILTER
    // -----------------------------------------------------

    const priceRange = $("#priceRange");
    const priceValue = $("#priceValue");
    const roomCount = $("#roomCount");

    const roomCards = $$(".room-card");


    function filterRooms() {

        if (!priceRange) return;

        const maximumPrice =
            Number(priceRange.value);

        if (priceValue) {
            priceValue.textContent = maximumPrice;
        }

        let visibleRooms = 0;

        roomCards.forEach(room => {

            const roomPrice =
                Number(room.dataset.price);

            if (roomPrice <= maximumPrice) {

                room.style.display = "";

                visibleRooms++;

            } else {

                room.style.display = "none";

            }
        });


        if (roomCount) {
            roomCount.textContent = visibleRooms;
        }
    }


    if (priceRange) {

        priceRange.addEventListener(
            "input",
            filterRooms
        );

        filterRooms();
    }


    // -----------------------------------------------------
    // FAVORITE / HEART BUTTONS
    // -----------------------------------------------------

    $$(".heart").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("saved");

            if (button.classList.contains("saved")) {

                button.textContent = "♥";

                showToast(
                    "Room added to your favorites."
                );

            } else {

                button.textContent = "♡";

                showToast(
                    "Room removed from favorites."
                );
            }
        });
    });


    // -----------------------------------------------------
    // BOOKING MODAL
    // -----------------------------------------------------

    const modal = $("#bookingModal");

    const selectedRoom = $("#selectedRoom");
    const selectedPrice = $("#selectedPrice");

    function openBookingModal(
        roomName = "City Deluxe",
        roomPrice = "180"
    ) {

        if (!modal) return;

        if (selectedRoom) {
            selectedRoom.textContent = roomName;
        }

        if (selectedPrice) {
            selectedPrice.textContent = roomPrice;
        }

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    function closeBookingModal() {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    // Room booking buttons

    $$(".book-room").forEach(button => {

        button.addEventListener("click", () => {

            const room =
                button.dataset.room || "City Deluxe";

            const price =
                button.dataset.price || "180";

            openBookingModal(room, price);
        });
    });


    // Close buttons

    $$("[data-close]").forEach(button => {

        button.addEventListener(
            "click",
            closeBookingModal
        );
    });


    // Escape key

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeBookingModal();
        }
    });


    // -----------------------------------------------------
    // SEARCH ROOMS BUTTON
    // -----------------------------------------------------

    const searchButton = $("#searchBtn");

    if (searchButton) {

        searchButton.addEventListener("click", () => {

            openBookingModal(
                "City Deluxe",
                "180"
            );

        });
    }


    // -----------------------------------------------------
    // DATE DISPLAY
    // -----------------------------------------------------

    const checkInLabel = $("#checkInLabel");
    const checkOutLabel = $("#checkOutLabel");


    const today = new Date();

    const tomorrow = new Date(today);

    tomorrow.setDate(
        today.getDate() + 1
    );


    const checkoutDate = new Date(today);

    checkoutDate.setDate(
        today.getDate() + 3
    );


    function formatDate(date) {

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric"
            }
        );
    }


    if (checkInLabel) {
        checkInLabel.textContent =
            formatDate(tomorrow);
    }


    if (checkOutLabel) {
        checkOutLabel.textContent =
            formatDate(checkoutDate);
    }


    // -----------------------------------------------------
    // BOOKING FORM
    // -----------------------------------------------------

    const bookingForm = $("#bookingForm");
    const successMessage = $("#successMessage");


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (successMessage) {

                    successMessage.style.display =
                        "block";
                }


                const submitButton =
                    bookingForm.querySelector(
                        ".btn"
                    );


                if (submitButton) {

                    submitButton.style.display =
                        "none";
                }


                showToast(
                    "Reservation request submitted!"
                );


                setTimeout(() => {

                    closeBookingModal();

                }, 2800);


                setTimeout(() => {

                    bookingForm.reset();

                    if (successMessage) {

                        successMessage.style.display =
                            "none";
                    }

                    if (submitButton) {

                        submitButton.style.display =
                            "inline-flex";
                    }

                }, 3200);

            }
        );
    }


    // -----------------------------------------------------
    // REVIEWS SLIDER
    // -----------------------------------------------------

    const reviews = $$(".review");

    const reviewNext = $("#reviewNext");
    const reviewPrev = $("#reviewPrev");

    const reviewNumber = $("#reviewNum");

    let currentReview = 0;


    function goToReview(index) {

        if (!reviews.length) return;


        currentReview =
            (index + reviews.length) %
            reviews.length;


        reviews.forEach(
            (review, i) => {

                review.classList.toggle(
                    "active",
                    i === currentReview
                );
            }
        );


        if (reviewNumber) {

            reviewNumber.textContent =
                `0${currentReview + 1} / 0${reviews.length}`;
        }
    }


    if (reviewNext) {

        reviewNext.addEventListener(
            "click",
            () => {
                goToReview(
                    currentReview + 1
                );
            }
        );
    }


    if (reviewPrev) {

        reviewPrev.addEventListener(
            "click",
            () => {
                goToReview(
                    currentReview - 1
                );
            }
        );
    }


    // -----------------------------------------------------
    // NEWSLETTER
    // -----------------------------------------------------

    const newsletter = $("#newsletter");


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                newsletter.reset();

                showToast(
                    "Thanks! You're on the LuxeStay list."
                );
            }
        );
    }


    // -----------------------------------------------------
    // TOAST NOTIFICATION
    // -----------------------------------------------------

    function showToast(message) {

        const toast = $("#toast");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.luxeStayToastTimer
        );


        window.luxeStayToastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2600);
    }


    // -----------------------------------------------------
    // ROOM CARD STAGGER ANIMATION
    // -----------------------------------------------------

    roomCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    // -----------------------------------------------------
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // -----------------------------------------------------

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });
    });


    // -----------------------------------------------------
    // SET MINIMUM BOOKING DATES
    // -----------------------------------------------------

    const checkInInput =
        document.querySelector(
            'input[name="checkin"]'
        );

    const checkOutInput =
        document.querySelector(
            'input[name="checkout"]'
        );


    function getDateString(date) {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;
    }


    if (checkInInput) {

        checkInInput.min =
            getDateString(tomorrow);
    }


    if (checkOutInput) {

        checkOutInput.min =
            getDateString(checkoutDate);
    }


    // Keep checkout after check-in

    if (checkInInput && checkOutInput) {

        checkInInput.addEventListener(
            "change",
            () => {

                const selectedDate =
                    new Date(
                        checkInInput.value
                    );


                selectedDate.setDate(
                    selectedDate.getDate() + 1
                );


                checkOutInput.min =
                    getDateString(
                        selectedDate
                    );


                if (
                    checkOutInput.value &&
                    new Date(
                        checkOutInput.value
                    ) <= new Date(
                        checkInInput.value
                    )
                ) {

                    checkOutInput.value =
                        "";
                }

            }
        );
    }


    // -----------------------------------------------------
    // INITIALIZATION
    // -----------------------------------------------------

    console.log(
        "LuxeStay website loaded successfully."
    );

});