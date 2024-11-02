package PTIT.IOT.Service.Impl;

import PTIT.IOT.Model.Action;
import PTIT.IOT.Repository.ActionRepository;
import PTIT.IOT.Service.ActionService;
import PTIT.IOT.Service.ActionSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActionServiceImpl implements ActionService {
    final private ActionRepository actionRepository;

    @Override
    public ResponseEntity<?> devicePage(int page, int size, Sort sort,String searchBy,String searchValues) {
        Pageable pageable = PageRequest.of(page, size, sort);
        Specification<Action> spec = null;
        if (searchBy != null && !searchBy.isEmpty() && searchValues != null && !searchValues.isEmpty()) {
            spec = Specification.where(ActionSpecification.hasAttribute(searchBy, searchValues));
        }
        return new ResponseEntity<>(actionRepository.findAll(spec,pageable), HttpStatus.OK);
    }
}
