import { Singleton } from "../Resource";
import get from "lodash/get";
import { getUserData } from "@utils";
const roles = [
  { id: 1, value: "admin", label: "Compliance Admin" },
  {
    id: 2,
    value: "regional representatives",
    label: "Regional Representatives",
  },
  { id: 3, value: "agent", label: "Inspector" },
  { id: 4, value: "pharmacist", label: "Pharmacist" },
  //   { value: "nupco_admin", label: "Nupco Admin" },
  // { id: 2, value: "moderator", label: "Moderator" },
  // {
  //   id: 3,
  //   value: "regional representatives",
  //   label: "Regional Representative",
  // },
  // { id: 4, value: "ascend team", label: "Ascend Team" },
  // { id: 5, value: "agent", label: "Agent" },
  // { id: 6, value: "obligation department", label: "Obligation Department" },
  // { id: 7, value: "facility_manager", label: "Facility Manager" },
];

export const getRoleLabel = (role = "") => {
  switch (role) {
    case "agent":
      return "inspector";
    case "admin":
      return "Compliance Admin";
    default:
      return role;
  }
};

class AuthClass {
  unprotectedModule = [];
  roles = roles;

  constructor() { }

  get user() {
    return getUserData();
  }

  get role() {
    return get(this.user, "type")?.toLowerCase();
  }

  get currentRoleLevel() {
    return get(
      this.roles.filter((role) => role.value === this.role),
      "0.id"
    );
  }

  get isAdmin() {
    return this.role === "admin";
  }

  get isNupcoAdmin() {
    return this.role === "nupco_admin";
  }

  get isRegionalRepresentatives() {
    // return true
    return this.role === "regional representatives";
  }

  get isAgent() {
    // return true;
    return this.role === "agent";
  }

  get isModerator() {
    return this.role === "moderator";
  }
  get isPharmacist() {
    return this.role === "pharmacist";
  }
  get userModules() {
    const user = getUserData();

    // hajj insspection form for every one
    if (Array.isArray(user?.modules)) {
      [
        "Medical-Mission",
        "Hajj-PHC",
        "Pharmacies-Audit",
        "Hajj-General-Hospital",
        "Hajj-General-Complex",
        "Hajj-Private-Hospital",
        "Forms"
      ].forEach((slug) => {
        user.modules.push({ slug });
      });
    }

    return get(user, "modules", []).map(
      (m) => m.slug?.toLowerCase() || m.name?.toLowerCase()
    );
  }

  get availableModules() {
    return [...this.userModules, ...this.unprotectedModule];
  }

  get regions() {
    const user = getUserData();
    return get(user, "region", []).map((m) => {
      return {
        ...m,
        label: m.name,
        value: m._id,
      };
    });
  }

  get isSystemUser() {
    return (
      this.user?.email === "danial.ghazali@ascend.com.sa" ||
      this.user?.email === "muhammad.ilyas@ascend.com.sa"
    );
  }
}
const AuthUser = new AuthClass();

export default AuthUser;
export { AuthClass };
