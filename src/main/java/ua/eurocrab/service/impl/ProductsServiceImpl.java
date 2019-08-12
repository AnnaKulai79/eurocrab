package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;
import ua.eurocrab.domain.MyMultipartFile;
import ua.eurocrab.domain.ProductsDTO;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.repository.ProductsRepository;
import ua.eurocrab.service.ProductsService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import static java.lang.Integer.parseInt;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public ProductsDTO findProductsById(Long id) {
        boolean exists = productsRepository.existsById(id);
        if (!exists){
            return null;
        }
        ProductsEntity product = productsRepository.findById(id).get();
        ProductsDTO productsDTO = modelMapper.map(product,ProductsDTO.class);
        return productsDTO;
    }

    @Override
    public ProductsDTO saveProduct(ProductsDTO productsDTO) throws IOException {
        ProductsEntity productsEntity = modelMapper.map(productsDTO,ProductsEntity.class);
        BASE64Decoder base64Decoder = new BASE64Decoder();
        byte[] fileContent = base64Decoder.decodeBuffer(productsDTO.getImage().split(",")[1]);
        String extension = productsDTO.getImage().split(",")[0].split("/")[1].split(";")[0];
        String name = UUID.randomUUID().toString();
        MyMultipartFile multipartFile = new MyMultipartFile(name, extension, fileContent);
        saveOnMashine(multipartFile);

        productsEntity.setImage(name + "." +extension);
        ProductsDTO product = modelMapper.map(productsRepository.save(productsEntity), ProductsDTO.class);
        return product;
    }

    @Override
    public List<ProductsDTO> findAllProducts() {
        List<ProductsEntity> productsEntities = productsRepository.findAll();
        List<ProductsDTO> productsDTOs = modelMapper.mapAll(productsEntities,ProductsDTO.class);
        return productsDTOs;
    }

    @Override
    public Page<ProductsEntity> findAllProductsUsingPageable(Pageable pageable) {
        return productsRepository.findAll(pageable);
    }

    @Override
    public Page<ProductsEntity> findAllProductsUsingPageableByCategories(Long id, Pageable pageable) {
        System.out.println(pageable.getPageNumber());
        System.out.println(pageable.getPageSize());
        return productsRepository.findAllByBrandCategoriesId(id, pageable);
    }

    @Override
    public Page<ProductsEntity> findAllProductsUsingPageableByBrand(Long id, Pageable pageable) {
        System.out.println(pageable.getPageNumber());
        System.out.println(pageable.getPageSize());
        return productsRepository.findAllByBrandId(id, pageable);
    }

    @Override
    public List<ProductsDTO> findProductsByCategoryId(Long id, String sortSTR) {
        List<ProductsEntity> productsEn = null;
        switch (sortSTR) {
            case "priceASC" : productsEn = productsRepository.findAllByCategoryIdPriceASC(id);
                break;
            case "priceDESC" : productsEn = productsRepository.findAllByCategoryIdPriceDESC(id);
                break;
            case "byLeader" : productsEn = productsRepository.findAllByCategoryIdByLeader(id);
                break;
            case "byNew" : productsEn = productsRepository.findAllByCategoryIdByNewTovar(id);
                break;
            case "all" : productsEn = productsRepository.findAllByCategoryIdByTitleASC(id);
                break;
            case "byTitle" : productsEn = productsRepository.findAllByCategoryIdByTitleASC(id);
                break;
        };
        List<ProductsDTO> productsDTOS = modelMapper.mapAll(productsEn, ProductsDTO.class);
        return productsDTOS;
    }

    @Override
    public List<ProductsDTO> findProductsByBrandId(Long id, String sortSTR) {
        List<ProductsEntity> productsEn = null;
        switch (sortSTR) {
            case "priceASC" : productsEn = productsRepository.findAllByBrandIdPriceASC(id);
                break;
            case "priceDESC" : productsEn = productsRepository.findAllByBrandIdPriceDESC(id);
                break;
            case "byLeader" : productsEn = productsRepository.findAllByBrandIdByLeader(id);
                break;
            case "byNew" : productsEn = productsRepository.findAllByBrandIdByNewTovar(id);
                break;
            case "all" : productsEn = productsRepository.findAllByBrandIdByTitleASC(id);
                break;
            case "byTitle" : productsEn = productsRepository.findAllByBrandIdByTitleASC(id);
                break;
        };
        System.out.println(productsEn.size() + "rozmir!!!!!!!!!!!!!!!!!!");
        List<ProductsDTO> productsDTOS = modelMapper.mapAll(productsEn, ProductsDTO.class);
        System.out.println(productsDTOS.size() + "rozmir!!!!!!!!!!!!!!!!!!");
        return productsDTOS;
    }

    @Override
    public List<ProductsDTO> findProductsByBrands(int startPrice, int endPrice, String brands, String sortSTR) {
        brands = brands.replaceAll("[\"]", "");
        List<ProductsEntity> productsEntity = null;
        switch (sortSTR) {
            case "priceASC" : productsEntity = productsRepository.findAllByBrandsPriceASC(startPrice, endPrice);
                break;
            case "priceDESC" : productsEntity = productsRepository.findAllByBrandsPriceDESC(startPrice, endPrice);
                break;
            case "byLeader" : productsEntity = productsRepository.findAllByBrandsByLeader(startPrice, endPrice);
                break;
            case "byNew" : productsEntity = productsRepository.findAllByBrandsByNewTovar(startPrice, endPrice);
                break;
            case "all" : productsEntity = productsRepository.findAllByBrandsByTitleASC(startPrice, endPrice);
                break;
            case "byTitle" : productsEntity = productsRepository.findAllByBrandsByTitleASC(startPrice, endPrice);
                break;
        };
        String[] brand = brands.split(",");
        List<ProductsEntity> productsEn = new ArrayList<>();
        for (int i = 0; i < brand.length; i++) {
            Iterator<ProductsEntity> iteratorPr = productsEntity.iterator();
            while (iteratorPr.hasNext() ) {
                ProductsEntity nextPr = iteratorPr.next();
                if((nextPr.getBrand().getId()).equals(Long.valueOf(brand[i]))) {
                    productsEn.add(nextPr);
                }
            }
        }
        List<ProductsDTO> productsDTOS = modelMapper.mapAll(productsEn, ProductsDTO.class);
        return productsDTOS;
    }

    @Override
    public List<ProductsDTO> findProductsByKey(String key, String sortingSTR) {
        key = "%" + key + "%";
        List<ProductsEntity> productsEn = null;
        switch (sortingSTR) {
            case "priceASC" : productsEn = productsRepository.findAllByKeyPriceASC(key);
                break;
            case "priceDESC" : productsEn = productsRepository.findAllByKeyPriceDESC(key);
                break;
            case "byLeader" : productsEn = productsRepository.findAllByKeyByLeaderDESC(key);
                break;
            case "byNew" : productsEn = productsRepository.findAllByKeyByNewTovarDESC(key);
                break;
            case "all" : productsEn = productsRepository.findAllByKeyByTitleASC(key);
                break;
            case "byTitle" : productsEn = productsRepository.findAllByKeyByTitleASC(key);
                break;
        };
        List<ProductsDTO> productsDTOS = modelMapper.mapAll(productsEn, ProductsDTO.class);
        return productsDTOS;
    }

    @Override
    public List<ProductsDTO> findAllProductsBySorting(String sortStr) {
        List<ProductsEntity> productsEn = null;
        switch (sortStr) {
            case "newTovar/priceASC" : productsEn = productsRepository.findAllByNewTovarPriceASC();
                                break;
            case "newTovar/priceDESC" : productsEn = productsRepository.findAllByNewTovarPriceDESC();
                                break;
            case "newTovar/byLeader" : productsEn = productsRepository.findAllByNewTovarByLeader();
                                break;
            case "newTovar/byNew" : productsEn = productsRepository.findAllByNewTovarByTitle();
                break;
            case "newTovar/all" : productsEn = productsRepository.findAllByNewTovarByTitle();
                break;
            case "newTovar/byTitle" : productsEn = productsRepository.findAllByNewTovarByTitle();
                                break;
            case "leader/priceASC" : productsEn = productsRepository.findAllByLeaderPriceASC();
                                break;
            case "leader/priceDESC" : productsEn = productsRepository.findAllByLeaderPriceDESC();
                                break;
            case "leader/byNew" : productsEn = productsRepository.findAllByLeaderByNew();
                                break;
            case "leader/byLeader" :productsEn = productsRepository.findAllByLeaderByTitle();
                break;
            case "leader/all" :productsEn = productsRepository.findAllByLeaderByTitle();
                break;
            case "leader/byTitle" : productsEn = productsRepository.findAllByLeaderByTitle();
                                break;
            case "sale/priceASC" : productsEn = productsRepository.findAllBySalePriceASC();
                                break;
            case "sale/priceDESC" : productsEn = productsRepository.findAllBySalePriceDESC();
                                break;
            case "sale/byLeader" : productsEn = productsRepository.findAllBySaleByLeader();
                                break;
            case "sale/byNew" : productsEn = productsRepository.findAllBySaleByNew();
                                break;
            case "sale/all" : productsEn = productsRepository.findAllBySaleByTitle();
                break;
            case "sale/byTitle" : productsEn = productsRepository.findAllBySaleByTitle();
                                break;

        };
        List<ProductsDTO> productsDTOS = modelMapper.mapAll(productsEn, ProductsDTO.class);
        return productsDTOS;
    }

    @Override
    public ProductsDTO changeCount(Long id) {
        ProductsEntity product = productsRepository.findById(id).get();
        product.setCount(product.getCount() + 1);
        return modelMapper.map(productsRepository.save(product), ProductsDTO.class);
    }

    @Override
    public ProductsDTO changeLikeCount(Long id) {
        ProductsEntity product = productsRepository.findById(id).get();
        product.setYesLike(product.getYesLike() + 1);
        return modelMapper.map(productsRepository.save(product), ProductsDTO.class);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProductsDTO updateProduct(Long id, ProductsDTO productsDTO) throws IOException {
        boolean exists = productsRepository.existsById(id);
        if (!exists) {
            return null;
        }
        ProductsEntity productFromDB = modelMapper.map(productsDTO,ProductsEntity.class);
        if(!productsDTO.getImage().equals("nothingChange")) {
        BASE64Decoder base64Decoder = new BASE64Decoder();
        byte[] fileContent = base64Decoder.decodeBuffer(productsDTO.getImage().split(",")[1]);
        String extension = productsDTO.getImage().split(",")[0].split("/")[1].split(";")[0];
        String name = UUID.randomUUID().toString();
        MyMultipartFile multipartFile = new MyMultipartFile(name, extension, fileContent);
//            String PATH = "E:/Ann/eurocrab/src/main/resources/static/uploads_images";
            String PATH = "uploads_images";
            File folder = new File(PATH);
            if(!folder.exists()) {
                folder.mkdirs();
            }

            multipartFile.transferTo(new File(PATH + "/" + name + "." +extension));

            //saveOnMashine(multipartFile);
        productFromDB.setImage(name + "." +extension);
        }else {
            ProductsEntity prod1 = productsRepository.findById(id).get();
            productFromDB.setImage(prod1.getImage());
        }
        productFromDB.setId(id);
        productsRepository.save(productFromDB);

        ProductsDTO product = modelMapper.map(productFromDB,ProductsDTO.class);

        return product;
    }

    @Override
    public List<ProductsDTO> findAllProductsRandom() {
        List<ProductsEntity> productsEntities = productsRepository.findAllRandom();
        List<ProductsDTO> productsDTOs = modelMapper.mapAll(productsEntities,ProductsDTO.class);
        return productsDTOs;
    }

    private  void saveOnMashine(MultipartFile multipartFile) throws IOException {
 //       String PATH = "/root/uploads_images";
//        String PATH = "C:/eurocrab/src/main/resources/static/uploads_images";
        String PATH = "uploads_images";
        File folder = new File(PATH);
        if(!folder.exists()) {
            folder.mkdirs();
        }
        File newMultipartFile = new File(PATH + "/" + multipartFile.getOriginalFilename());
        OutputStream outputStream = new FileOutputStream(newMultipartFile);
        BufferedOutputStream buf = new BufferedOutputStream(outputStream);
        buf.write(multipartFile.getBytes(),0,multipartFile.getBytes().length);
        buf.flush();
        buf.close();
        outputStream.close();
    }
    private  void deleteOnMashine(MultipartFile multipartFile) throws IOException {
        String PATH = "E:/Ann/eurocrab/src/main/resources/static/uploads_images";
//        File newMultipartFile = new File(PATH + "/" + multipartFile.getOriginalFilename());
//        OutputStream outputStream = new FileOutputStream(newMultipartFile);
//        BufferedOutputStream buf = new BufferedOutputStream(outputStream);
//        buf.write(multipartFile.getBytes(),0,multipartFile.getBytes().length);
//        buf.flush();
    }
}
