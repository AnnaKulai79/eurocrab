package ua.eurocrab.domain;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class MyMultipartFile implements MultipartFile {

    private String name;
    private String extension;
    private byte[] fileContent;

    public MyMultipartFile() {
    }

    public MyMultipartFile(String name, String extension, byte[] fileContent) {
        this.name = name;
        this.extension = extension;
        this.fileContent = fileContent;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getOriginalFilename() {
        return name + "." + extension;
    }

    @Override
    public String getContentType() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public long getSize() {
        return 0;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return fileContent;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(fileContent);
    }

    @Override
    public void transferTo(File file) throws IOException, IllegalStateException {
        new FileOutputStream(file).write(fileContent);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }
}
