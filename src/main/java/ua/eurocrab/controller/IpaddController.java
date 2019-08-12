package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.IpaddDTO;
import ua.eurocrab.service.IpaddService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@RestController
@RequestMapping("ipadd")
public class IpaddController {
    @Autowired
    private IpaddService ipaddService;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<IpaddDTO> ipaddDTOs = ipaddService.findAllIpadd();
        return new ResponseEntity<>(ipaddDTOs,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveIpadd(@RequestBody String ipaddDTO) {
        IpaddDTO ipaddDTOs = ipaddService.saveIpadd(ipaddDTO);
        return new ResponseEntity<>(ipaddDTOs, HttpStatus.CREATED);
    }

}
