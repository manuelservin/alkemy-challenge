import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../../context/auth/AuthContext";
import MainRoutes from "../../../../routes/MainRoutes";

describe("Tests in MainRoutes", () => {
  const contextValue = {
    user: {
      token: "token",
      logged: true,
    },
  };
  test("should show home screen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <MainRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
  test("should show search screen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search"]}>
          <MainRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.find(".search-form").exists()).toBe(true);
  });
});
