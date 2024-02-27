class NavService {
  Navigation = null;

  constructor() {}

  setNavigation = (nav) => {
    this.Navigation = nav;
  };
}
const NavigationService = new NavService();
export default NavigationService;
