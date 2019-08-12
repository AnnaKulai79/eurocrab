package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.ProductsDTO;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.service.ProductsService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @GetMapping
    public ResponseEntity<?> getAllProducts(){
        List<ProductsDTO> productsDTOs = productsService.findAllProducts();
        if (productsDTOs.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productsDTOs,HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity<?> getAllProductsRandom(){
        List<ProductsDTO> productsDTOs = productsService.findAllProductsRandom();
        if (productsDTOs.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productsDTOs,HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findProductById(@PathVariable("id") Long id) {
        ProductsDTO product = productsService.findProductsById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/byCategory/{id}/{sortSTR}")
    public ResponseEntity<?> findProductByCategoryId(@PathVariable("id") Long id, @PathVariable("sortSTR") String sortSTR) {
        List<ProductsDTO> products = productsService.findProductsByCategoryId(id, sortSTR);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/byBrand/{id}/{sortSTR}")
    public ResponseEntity<?> findProductByBrandId(@PathVariable("id") Long id, @PathVariable("sortSTR") String sortSTR) {
        List<ProductsDTO> products = productsService.findProductsByBrandId(id, sortSTR);
        System.out.println(products.size() + "rozmir!!!!!!!!!!!!!!!!!!");
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search/{key}/{sortingSTR}")
    public ResponseEntity<?> findProductByKey(@PathVariable("key") String key, @PathVariable("sortingSTR") String sortingSTR) {
        List<ProductsDTO> products = productsService.findProductsByKey(key, sortingSTR);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/byBrands/{price1}/{price2}/{sortSTR}")
    public ResponseEntity<?> findProductByBrands(@PathVariable("price1") int startPrice,
                                                 @PathVariable("price2") int endPrice,
                                                 @PathVariable("sortSTR") String sortSTR,
                                                 @RequestBody String brands) {
        List<ProductsDTO> products = productsService.findProductsByBrands(startPrice, endPrice, brands, sortSTR);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping(value = "/pageable")
    public Page<ProductsEntity> getAllProductsUsingPageable(@PageableDefault(sort = {"id"},direction = Sort.Direction.ASC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageable(pageable);
    }

    @GetMapping(value = "/priceASC/pageable")
    public Page<ProductsEntity> getAllProductsByPiceASCUsingPageable(@PageableDefault(sort = {"price"},direction = Sort.Direction.ASC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageable(pageable);
    }

    @GetMapping(value = "/priceDESC/pageable")
    public Page<ProductsEntity> getAllProductsByPriceDESCUsingPageable(@PageableDefault(sort = {"price"},direction = Sort.Direction.DESC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageable(pageable);
    }

    @GetMapping(value = "/byLeader/pageable")
    public Page<ProductsEntity> getAllProductsByLeaderUsingPageable(@PageableDefault(sort = {"leader"},direction = Sort.Direction.DESC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageable(pageable);
    }

    @GetMapping(value = "{sortSTR1}/{sortSTR2}")
    public ResponseEntity<?> getAllProductsBySorting(@PathVariable("sortSTR1") String sortSTR1, @PathVariable("sortSTR2") String sortSTR2){
        String sortSTR = sortSTR1 + "/" + sortSTR2;
        List<ProductsDTO> products = productsService.findAllProductsBySorting(sortSTR);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping(value = "/byTitle/pageable")
    public Page<ProductsEntity> getAllProductsByTitleUsingPageable(@PageableDefault(sort = {"title"},direction = Sort.Direction.ASC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageable(pageable);
    }

    @GetMapping(value = "/byCategories/{id}/pageable")
    public Page<ProductsEntity> getAllProductsByCategoriesUsingPageable(@PathVariable("id") Long id, @PageableDefault(sort = {"brand.categories"},direction = Sort.Direction.ASC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageableByCategories(id, pageable);
    }

    @GetMapping(value = "/byBrandes/{id}/pageable")
    public Page<ProductsEntity> getAllProductsByBrandsUsingPageable(@PathVariable("id") Long id, @PageableDefault(sort = {"brand.categories"},direction = Sort.Direction.ASC)
                                                                        Pageable pageable){
        return productsService.findAllProductsUsingPageableByBrand(id, pageable);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductsDTO productsDTO) throws IOException {
        ProductsDTO product = productsService.saveProduct(productsDTO);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PostMapping("/changeCount/{id}")
    public ResponseEntity<?> changeCount(@PathVariable("id") Long id)  {
        ProductsDTO product = productsService.changeCount(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/changeLikeCount/{id}")
    public ResponseEntity<?> changeLikeCount(@PathVariable("id") Long id)  {
        ProductsDTO product = productsService.changeLikeCount(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public boolean deleteProduct(@PathVariable("id") Long id) {
        productsService.deleteProduct(id);
        return true;
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody ProductsDTO productsDTO) throws IOException {
        ProductsDTO product = productsService.updateProduct(id,productsDTO);
        if (product==null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }


}
