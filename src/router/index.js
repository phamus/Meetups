import Home from "../components/Home.vue";
import Meetups from "../components/Meetup/Meetups";
import CreateMeetup from "../components/Meetup/CreateMeetup";
import Profile from "../components/User/Profile";
import Signin from "../components/User/Signin";
import Signup from "../components/User/Signup";
import Meetup from "../components/Meetup/Meetup";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/meetups", name: "Meetups", component: Meetups },
  { path: "/meetup/new", name: "CreateMeetup", component: CreateMeetup },
  { path: "/meetups/:id", name: "Meetup", component: Meetup },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/signin", name: "Signin", component: Signin },
  { path: "/signup", name: "Signup", component: Signup },
];

export default routes;
