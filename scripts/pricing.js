function selectCountry() {
  document.querySelector('.js-select-country-button')
    .addEventListener('click', () => {
      console.log('clicked');
    })
}

selectCountry();

export function renderPricingPage() {
  pricingPageType();
  closePricingSection();
}

export function pricingPageType() {
  const personalButton = document.querySelector('.js-personal-button');
  const businessButton = document.querySelector('.js-business-button');
  const personalPlans = document.querySelector('.js-personal-plans');
  const businessPlans = document.querySelector('.js-business-plans');

  businessButton.addEventListener('click', () => {
    businessButton.classList.add('active');
    personalButton.classList.remove('active');
    personalPlans.classList.remove('isOpened');
    businessPlans.classList.add('isOpened');
  });

  personalButton.addEventListener('click', () => {
    personalButton.classList.add('active');
    businessButton.classList.remove('active');
    personalPlans.classList.add('isOpened');
    businessPlans.classList.remove('isOpened');
  });
}

pricingPageType();

export function closePricingSection() {
  const closeButton = document.querySelector('.js-close-pricing-button');
  closeButton.addEventListener('click', () => {
    window.location.href = '';
  })
}