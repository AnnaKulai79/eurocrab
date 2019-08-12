package ua.eurocrab.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.UploadsImagesEntity;

import java.util.List;

@Repository
public interface UploadsImagesRepository extends JpaRepository<UploadsImagesEntity,Long> {
    @Query("SELECT u FROM uploads_images u WHERE u.products.id=?1")
    List<UploadsImagesEntity> findAllProductId(Long id);
}
