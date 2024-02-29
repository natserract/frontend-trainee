import { memo } from "react";

type Item = {
  path: string;
  link: string;
  text: string;
  children?: Item[];
};

type Props = {
  items: Item[];
  activePath?: string;
  classes?: string;
};

function RecurseMenu({ items, activePath, classes }: Props) {
  return (
    <ul className={classes}>
      {items.map((item) => {
        const isParentActive = activePath == item.path;
        const isChildActive = item.children?.some(
          (itemNext) => activePath === itemNext.path
        );

        return (
          <li
            key={item.path}
            className={isParentActive || isChildActive ? "active" : ""}
          >
            <span>{item.text}</span>
            {item.children && (
              <RecurseMenu
                items={item.children}
                activePath={activePath}
                classes="children"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export type { Item };

export default memo(RecurseMenu);
