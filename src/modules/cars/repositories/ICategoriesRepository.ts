import { Category } from "../infra/typeorm/entities/category"

interface ICreateCategoryDTO{
    name: string,
    description: string
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>
    list(): Promise<Category []>
    create({name, description}: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }