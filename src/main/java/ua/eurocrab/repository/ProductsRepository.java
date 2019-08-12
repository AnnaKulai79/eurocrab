package ua.eurocrab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.ProductsEntity;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<ProductsEntity,Long> {
    @Query(value = "SELECT DISTINCT * FROM products WHERE visible='1' ORDER by RAND() LIMIT 4",nativeQuery = true)
    List<ProductsEntity> findAllRandom();

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.categories.id=?1 ORDER BY p.price ASC")
    List<ProductsEntity> findAllByCategoryIdPriceASC(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.categories.id=?1 ORDER BY p.price DESC")
    List<ProductsEntity> findAllByCategoryIdPriceDESC(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.categories.id=?1 ORDER BY p.leader DESC")
    List<ProductsEntity> findAllByCategoryIdByLeader(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.categories.id=?1 ORDER BY p.newTovar DESC")
    List<ProductsEntity> findAllByCategoryIdByNewTovar(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.categories.id=?1 ORDER BY p.title ASC")
    List<ProductsEntity> findAllByCategoryIdByTitleASC(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.id=?1 ORDER BY p.price ASC")
    List<ProductsEntity> findAllByBrandIdPriceASC(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.id=?1 ORDER BY p.price DESC")
    List<ProductsEntity> findAllByBrandIdPriceDESC(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.id=?1 ORDER BY p.leader DESC")
    List<ProductsEntity> findAllByBrandIdByLeader(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.id=?1 ORDER BY p.newTovar DESC")
    List<ProductsEntity> findAllByBrandIdByNewTovar(Long id);

    @Query("SELECT p FROM products p WHERE p.visible='1' AND p.brand.id=?1 ORDER BY p.title ASC")
    List<ProductsEntity> findAllByBrandIdByTitleASC(Long id);

    @Query(value = "SELECT * FROM products p WHERE p.visible='1' AND p.price BETWEEN ?1 AND ?2 ORDER BY p.price ASC",nativeQuery = true)
    List<ProductsEntity> findAllByBrandsPriceASC(int startPrice, int endPrice);

    @Query(value = "SELECT * FROM products p WHERE p.visible='1' AND p.price BETWEEN ?1 AND ?2 ORDER BY p.price DESC",nativeQuery = true)
    List<ProductsEntity> findAllByBrandsPriceDESC(int startPrice, int endPrice);

    @Query(value = "SELECT * FROM products p WHERE p.visible='1' AND p.price BETWEEN ?1 AND ?2 ORDER BY p.leader DESC",nativeQuery = true)
    List<ProductsEntity> findAllByBrandsByLeader(int startPrice, int endPrice);

    @Query(value = "SELECT * FROM products p WHERE p.visible='1' AND p.price BETWEEN ?1 AND ?2 ORDER BY p.new_tovar DESC",nativeQuery = true)
    List<ProductsEntity> findAllByBrandsByNewTovar(int startPrice, int endPrice);

    @Query(value = "SELECT * FROM products p WHERE p.visible='1' AND p.price BETWEEN ?1 AND ?2 ORDER BY p.title ASC",nativeQuery = true)
    List<ProductsEntity> findAllByBrandsByTitleASC(int startPrice, int endPrice);


    @Query("SELECT p FROM products p WHERE p.title LIKE ?1 AND p.visible='1' ORDER BY p.price ASC")
    List<ProductsEntity> findAllByKeyPriceASC(String key);

    @Query("SELECT p FROM products p WHERE p.title LIKE ?1 AND p.visible='1' ORDER BY p.price DESC")
    List<ProductsEntity> findAllByKeyPriceDESC(String key);

    @Query("SELECT p FROM products p WHERE p.title LIKE ?1 AND p.visible='1' ORDER BY p.leader DESC")
    List<ProductsEntity> findAllByKeyByLeaderDESC(String key);

    @Query("SELECT p FROM products p WHERE p.title LIKE ?1 AND p.visible='1' ORDER BY p.newTovar DESC")
    List<ProductsEntity> findAllByKeyByNewTovarDESC(String key);

    @Query("SELECT p FROM products p WHERE p.title LIKE ?1 AND p.visible='1' ORDER BY p.title ASC")
    List<ProductsEntity> findAllByKeyByTitleASC(String key);

    @Query(value = "SELECT * FROM products p WHERE p.new_tovar='1' AND p.visible='1' order by p.price ASC",nativeQuery = true)
    List<ProductsEntity> findAllByNewTovarPriceASC();

    @Query(value = "SELECT * FROM products p WHERE p.new_tovar='1' AND p.visible='1' order by p.price DESC",nativeQuery = true)
    List<ProductsEntity> findAllByNewTovarPriceDESC();

    @Query(value = "SELECT * FROM products p WHERE p.new_tovar='1' AND p.visible='1' order by p.leader DESC",nativeQuery = true)
    List<ProductsEntity> findAllByNewTovarByLeader();

    @Query(value = "SELECT * FROM products p WHERE p.new_tovar='1' AND p.visible='1' order by p.title ASC",nativeQuery = true)
    List<ProductsEntity> findAllByNewTovarByTitle();

    @Query(value = "SELECT * FROM products p WHERE p.leader='1' AND p.visible='1' order by p.price ASC",nativeQuery = true)
    List<ProductsEntity> findAllByLeaderPriceASC();

    @Query(value = "SELECT * FROM products p WHERE p.leader='1' AND p.visible='1' order by p.price DESC",nativeQuery = true)
    List<ProductsEntity> findAllByLeaderPriceDESC();

    @Query(value = "SELECT * FROM products p WHERE p.leader='1' AND p.visible='1' order by p.new_tovar DESC",nativeQuery = true)
    List<ProductsEntity> findAllByLeaderByNew();

    @Query(value = "SELECT * FROM products p WHERE p.leader='1' AND p.visible='1' order by p.title ASC",nativeQuery = true)
    List<ProductsEntity> findAllByLeaderByTitle();

    @Query(value = "SELECT * FROM products p WHERE p.sale='1' AND p.visible='1' order by p.price ASC",nativeQuery = true)
    List<ProductsEntity> findAllBySalePriceASC();

    @Query(value = "SELECT * FROM products p WHERE p.sale='1' AND p.visible='1' order by p.price DESC",nativeQuery = true)
    List<ProductsEntity> findAllBySalePriceDESC();

    @Query(value = "SELECT * FROM products p WHERE p.sale='1' AND p.visible='1' order by p.leader DESC",nativeQuery = true)
    List<ProductsEntity> findAllBySaleByLeader();

    @Query(value = "SELECT * FROM products p WHERE p.sale='1' AND p.visible='1' order by p.new_tovar DESC",nativeQuery = true)
    List<ProductsEntity> findAllBySaleByNew();

    @Query(value = "SELECT * FROM products p WHERE p.sale='1' AND p.visible='1' order by p.title ASC",nativeQuery = true)
    List<ProductsEntity> findAllBySaleByTitle();

    //@Query("SELECT p FROM products p WHERE p.brand.categories.id=?1", count)
    Page<ProductsEntity> findAllByBrandCategoriesId(Long id, Pageable pageable);

    Page<ProductsEntity> findAllByBrandId(Long id, Pageable pageable);
}