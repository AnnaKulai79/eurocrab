package ua.eurocrab.service;

import ua.eurocrab.domain.CategoryBrandDTO;
import ua.eurocrab.domain.CategoryDTO;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    List<CategoryBrandDTO> findAllCategories();
    CategoryBrandDTO saveCategory(CategoryBrandDTO categoryBrandDTO) throws IOException;

    List<CategoryDTO> findAllCategory();

    void deleteCategory(Long id);

    CategoryBrandDTO findCategoryBrand(Long id);

}
