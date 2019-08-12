package ua.eurocrab.service;

import ua.eurocrab.domain.IpaddDTO;

import java.util.List;

public interface IpaddService {
    List<IpaddDTO> findAllIpadd();

    IpaddDTO saveIpadd(String ipaddDTO);
}
