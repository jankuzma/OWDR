document.addEventListener("DOMContentLoaded", function () {
    /**
     * HomePage - Help section
     */
    class Help {
        constructor($el) {
            this.$el = $el;
            this.$buttonsContainer = $el.querySelector(".help--buttons");
            this.$slidesContainers = $el.querySelectorAll(".help--slides");
            this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
            this.init();
        }

        init() {
            this.events();
        }

        events() {
            /**
             * Slide buttons
             */
            this.$buttonsContainer.addEventListener("click", e => {
                if (e.target.classList.contains("btn")) {
                    this.changeSlide(e);
                }
            });

            /**
             * Pagination buttons
             */
            this.$el.addEventListener("click", e => {
                if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
                    this.changePage(e);
                }
            });
        }

        changeSlide(e) {
            e.preventDefault();
            const $btn = e.target;

            // Buttons Active class change
            [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
            $btn.classList.add("active");

            // Current slide
            this.currentSlide = $btn.parentElement.dataset.id;

            // Slides active class change
            this.$slidesContainers.forEach(el => {
                el.classList.remove("active");

                if (el.dataset.id === this.currentSlide) {
                    el.classList.add("active");
                }
            });
        }

        /**
         * TODO: callback to page change event
         */
        changePage(e) {
            e.preventDefault();
            const page = e.target.dataset.page;

            console.log(page);
        }
    }

    const helpSection = document.querySelector(".help");
    if (helpSection !== null) {
        new Help(helpSection);
    }

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });


        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
            this.$step.parentElement.hidden = this.currentStep >= 6;

            // TODO: get data from inputs and show them in summary
        }

    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }
});
const organizations = document.querySelectorAll(".form-group--checkbox input[type='radio']");

const categories = document.querySelectorAll(".form-group--checkbox input[type='checkbox']");
    categories.forEach(category => {

        category.addEventListener("change", function () {
            organizations.forEach(organization => {
                const selectedCategories = Array.from(categories)
                    .filter(cat => cat.checked)
                    .map(cat => cat.value);

                if (selectedCategories.length === 0) {
                    organization.closest(".form-group--checkbox").style.display = "block";

                } else {
                    const organizationCategories = organization.placeholder.split(' ');
                    const matches = selectedCategories.every(cat => organizationCategories.includes(cat));

                    if (matches) {
                        organization.closest(".form-group--checkbox").style.display = "block";
                    } else {
                        organization.closest(".form-group--checkbox").style.display = "none";
                    }
                }
            });
        });
    });

const bag_value_input = document.body.querySelector('body > section > div.form--steps-container > form > div > div.form-group.form-group--inline > label > input[type="number"]')
const summary_bag_value =  document.querySelector('div.summary > div:nth-child(1) > ul > li:nth-child(1)')

const nextbtn3 = document.querySelector('body > section > div.form--steps-container > form > div[data-step="3"] > div.form-group.form-group--buttons > button.btn.next-step')
nextbtn3.addEventListener('click', () => {
    const inputElements = document.querySelectorAll('div[style="display: block;"] > label > span > div:nth-child(1)');
    const summary_inst_value =  document.querySelector('div.summary > div:nth-child(1) > ul > li:nth-child(2)')
    summary_inst_value.innerText = `Wspierasz "${inputElements[0].innerText}".`
})

const nextbtn4 = document.querySelector('body > section > div.form--steps-container > form > div[data-step="4"] > div.form-group.form-group--buttons > button.btn.next-step')

nextbtn4.addEventListener('click', () => {
    let inputs = [
            document.querySelector('div > div[class="form-group form-group--inline"] > label > input[name="address"]'),
            document.querySelector('div > div[class="form-group form-group--inline"] > label > input[name="city"]'),
            document.querySelector('div > div[class="form-group form-group--inline"] > label > input[name="postcode"]'),
            document.querySelector('div > div[class="form-group form-group--inline"] > label > input[name="phone"]'),
            document.querySelector('div > div[class="form-group form-group--inline"] > label > input[name="data"]'),
            document.querySelector('div > div[class="form-group form-group--inline"] > label > textarea')
    ]

    const summaryElements = [
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(1) > ul > li:nth-child(1)'),
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(1) > ul > li:nth-child(2)'),
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(1) > ul > li:nth-child(3)'),
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(1) > ul > li:nth-child(4)'),
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(2) > ul > li:nth-child(1)'),
        document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(2) > ul > li:nth-child(3)'),
]
    const timeElement = document.querySelector('body > section > div.form--steps-container > form > div.active > div.form-section.form-section--columns > div:nth-child(2) > div:nth-child(3) > label > input[type="time"]')
    const summaryTimeElement = document.querySelector('div[class="form-section form-section--columns"] > div:nth-child(2) > ul > li:nth-child(2)')
    if (inputs.length === summaryElements.length) {
        for (let i = 0; i < inputs.length; i++) {
            summaryElements[i].textContent = inputs[i].value;
        }
        summaryTimeElement.replaceWith(timeElement)

    } else {
        console.error("Number of inputs doesn't match the number of li elements.");
    }
})

bag_value_input.addEventListener("change", function ()  {
    summary_bag_value.innerText = `${bag_value_input.value
    } worki`
})
