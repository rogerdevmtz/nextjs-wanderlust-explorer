"use client";

import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string; meta?: string | number };
export type SelectGroup = { label?: string; options: SelectOption[] };

type Props = {
  id?: string;
  name?: string;
  label?: string;
  icon?: ReactNode;
  groups: SelectGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function Select({ id, name, label, icon, groups, value, defaultValue = "", onChange, className = "" }: Props) {
  const autoId = useId();
  const buttonId = id ?? `select-${autoId}`;
  const listId = `${buttonId}-list`;
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const options = groups.flatMap((group) => group.options);
  const selected = options.find((option) => option.value === current) ?? options[0];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const listbox = list.current;
    if (!listbox) return;
    listbox.focus({ preventScroll: true });
    const item = listbox.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!item) return;
    const top = item.offsetTop;
    if (top < listbox.scrollTop) listbox.scrollTop = top - 8;
    else if (top + item.offsetHeight > listbox.scrollTop + listbox.clientHeight) listbox.scrollTop = top + item.offsetHeight - listbox.clientHeight + 8;
  }, [open, active]);

  function openList() {
    setActive(Math.max(0, options.findIndex((option) => option.value === current)));
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    if (value === undefined) setInner(option.value);
    onChange?.(option.value);
    setOpen(false);
    button.current?.focus();
  }

  function onButtonKey(event: KeyboardEvent) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  }

  function onListKey(event: KeyboardEvent) {
    const last = options.length - 1;
    const moves: Record<string, () => void> = {
      ArrowDown: () => setActive((index) => Math.min(last, index + 1)),
      ArrowUp: () => setActive((index) => Math.max(0, index - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: () => { setOpen(false); button.current?.focus(); },
      Tab: () => setOpen(false),
    };
    const move = moves[event.key];
    if (!move) return;
    if (event.key !== "Tab") event.preventDefault();
    move();
  }

  const offsets = groups.map((_, groupIndex) => groups.slice(0, groupIndex).reduce((sum, group) => sum + group.options.length, 0));
  return (
    <div ref={root} className={`select ${open ? "select-open" : ""} ${className}`}>
      {name && <input type="hidden" name={name} value={current} />}
      <button ref={button} id={buttonId} type="button" className="select-trigger" aria-haspopup="listbox"
        aria-expanded={open} aria-controls={listId} aria-label={label ? `${label}: ${selected?.label}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())} onKeyDown={onButtonKey}>
        {icon}
        <span className="select-value">{selected?.label}</span>
        <ChevronDown aria-hidden="true" className="select-chevron" size={16} />
      </button>
      {open && (
        <ul ref={list} id={listId} role="listbox" tabIndex={-1} className="select-list" aria-label={label}
          aria-activedescendant={`${listId}-${active}`} onKeyDown={onListKey}>
          {groups.map((group, groupIndex) => (
            <li key={group.label ?? groupIndex} role="presentation">
              {group.label && <span className="select-group" aria-hidden="true">{group.label}</span>}
              <ul role="group" aria-label={group.label}>
                {group.options.map((option, position) => {
                  const optionIndex = offsets[groupIndex] + position;
                  const isSelected = option.value === current;
                  return (
                    <li key={option.value || "all"} id={`${listId}-${optionIndex}`} data-index={optionIndex} role="option"
                      aria-selected={isSelected} className={optionIndex === active ? "select-active" : undefined}
                      onPointerEnter={() => setActive(optionIndex)} onClick={() => choose(optionIndex)}>
                      <span className="select-label">{option.label}</span>
                      {option.meta !== undefined && <span className="select-meta">{option.meta}</span>}
                      <Check aria-hidden="true" size={15} className="select-check" />
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
