package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.BrandDTO;
import ua.eurocrab.service.BrandService;

import java.util.List;

@RestController
@CrossOrigin
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping(value = "/brand")
    public ResponseEntity<?> findAllBrand() {
        List<BrandDTO> brandDTOs = brandService.findAllBrands();
        if (brandDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(brandDTOs, HttpStatus.OK);
    }

    @GetMapping(value = "/brand/{id}")
    public ResponseEntity<?> findBrandById(@PathVariable("id") Long id) {
        BrandDTO brandDTO = brandService.findBrandById(id);
        if (brandDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(brandDTO, HttpStatus.OK);
    }

    @GetMapping(value = "/brands/{id}")
    public ResponseEntity<?> findBrandByCategoryId(@PathVariable("id") Long id) {
        List<BrandDTO> brandDTOs = brandService.findBrandByCategoryId(id);
        if (brandDTOs == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(brandDTOs, HttpStatus.OK);
    }


    @PostMapping(value = "/brand")
    public ResponseEntity<?> createBrand(@RequestBody BrandDTO brand) {
        BrandDTO brandDTO = brandService.saveBrand(brand);
        return new ResponseEntity<>(brandDTO, HttpStatus.CREATED);
    }

}
