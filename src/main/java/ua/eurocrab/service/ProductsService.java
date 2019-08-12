package ua.eurocrab.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import ua.eurocrab.domain.ProductsDTO;
import ua.eurocrab.entity.ProductsEntity;

import java.io.IOException;
import java.util.List;

public interface ProductsService {

    ProductsDTO findProductsById(Long id);

    ProductsDTO saveProduct(ProductsDTO productsDTO) throws IOException;

    List<ProductsDTO> findAllProducts();

    Page<ProductsEntity> findAllProductsUsingPageable(Pageable pageable);

    void deleteProduct(Long id);

    ProductsDTO updateProduct(Long id, ProductsDTO productsDTO) throws IOException;

    List<ProductsDTO> findAllProductsRandom();

    Page<ProductsEntity> findAllProductsUsingPageableByCategories(Long id, Pageable pageable);

    List<ProductsDTO> findProductsByCategoryId(Long id, String sortSTR);

    List<ProductsDTO> findProductsByBrandId(Long id, String sortSTR);

    List<ProductsDTO> findProductsByBrands(int startPrice, int endPrice, String brands, String sortSTR);

    List<ProductsDTO> findProductsByKey(String key, String sortingSTR);

    List<ProductsDTO> findAllProductsBySorting(String sortSTR);

    ProductsDTO changeCount(Long id);

    ProductsDTO changeLikeCount(Long id);

    Page<ProductsEntity> findAllProductsUsingPageableByBrand(Long id, Pageable pageable);
}
