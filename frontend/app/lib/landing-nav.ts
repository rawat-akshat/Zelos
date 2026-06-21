/** Landing CTAs: signed-in users always go to workspace (/dashboard). */
export function landingRoutes(isAuthenticated: boolean) {
  return {
    workspace: "/dashboard",
    signIn: isAuthenticated ? "/dashboard" : "/login",
    startGoal: isAuthenticated ? "/dashboard" : "/dashboard?newGoal=1",
  };
}
