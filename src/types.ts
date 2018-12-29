export interface IFoodNew {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: string;
}

export interface IFood extends IFoodNew {
  id: string;
}

export interface IHandleModalOpen {
  (): void;
}

export interface IHandleModalClose {
  (): void;
}

export interface IHandleSearchInput {
  (value: string): void;
}

export interface IHandleCreateFood {
  (item: IFoodNew): void;
}
