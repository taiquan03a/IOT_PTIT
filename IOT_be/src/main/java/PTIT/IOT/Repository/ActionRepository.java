package PTIT.IOT.Repository;

import PTIT.IOT.Model.Action;
import PTIT.IOT.Model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Action, Integer> , JpaSpecificationExecutor<Action> {
    Page<Action> findAll(Pageable pageable);
}
