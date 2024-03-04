import RecurseMenu, { Item } from "./recurse-menu";

const menus: Item[] = [
  {
    path: "menu-1",
    link: "/menu-1",
    text: "Menu 1",
    children: [
      {
        path: "menu-1.1",
        link: "/menu-1.1",
        text: "Menu 1.1",
      },
      {
        path: "menu-1.2",
        link: "/menu-1.2",
        text: "Menu 1.3",
      },
    ],
  },
  {
    path: "menu-2",
    link: "/menu-2",
    text: "Menu 2",
  },
];

function RecursiveComponentPlayground() {
  return <RecurseMenu items={menus} activePath="menu-1.1" />;
}

export default RecursiveComponentPlayground;
