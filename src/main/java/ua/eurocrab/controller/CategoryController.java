package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.CategoryBrandDTO;
import ua.eurocrab.domain.CategoryDTO;
import ua.eurocrab.entity.CategoryEntity;
import ua.eurocrab.service.CategoryService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/brands")
    public ResponseEntity<?> getAllCategoriesAndBrands() throws Exception {
        List<CategoryBrandDTO> categories = categoryService.findAllCategories();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping(value = "/brands/{id}")
    public ResponseEntity<?> getAllCategoriesAndBrands(@PathVariable("id") Long id) throws Exception {
        CategoryBrandDTO categoryBrand = categoryService.findCategoryBrand(id);
        return new ResponseEntity<>(categoryBrand,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<CategoryDTO> categories = categoryService.findAllCategory();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PostMapping
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> createCategoryBrand(@RequestBody CategoryBrandDTO categoryBrandDTO) throws IOException {
        CategoryBrandDTO catBrand = categoryService.saveCategory(categoryBrandDTO);
        return new ResponseEntity<>(catBrand, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
