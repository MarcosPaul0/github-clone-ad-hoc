

import styled from '../styles/app.module.css';
import { EntityOptions } from './EntityOptions';
import { FilterOptions } from './FilterOptions';
import { SortOptions } from './SortOptions';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`
      bg-gray-900 flex flex-col gap-5 z-10 py-8
      duration-100  transition-width ease-linear overflow-hidden
      ${styled.sidebar}
      ${isOpen ? "w-96 px-6" : "w-0 px-0"}
    `}
    >
      <EntityOptions />
      <FilterOptions />
      <SortOptions />
    </aside>
  );
}
