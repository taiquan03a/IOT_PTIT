package PTIT.IOT.Service;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

public interface ActionService {
    ResponseEntity<?> devicePage(int page, int size, Sort sort,String searchBy, String searchValue);
}
