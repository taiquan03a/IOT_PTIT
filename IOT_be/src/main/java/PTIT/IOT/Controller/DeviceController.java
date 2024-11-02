package PTIT.IOT.Controller;

import PTIT.IOT.Repository.ActionRepository;
import PTIT.IOT.Repository.DeviceRepository;
import PTIT.IOT.Service.DeviceService;
import PTIT.IOT.Service.MqttService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/device")
public class DeviceController {

    private final MqttService mqttService;
    private final DeviceService deviceService;
    private final ActionRepository actionRepository;

    public DeviceController(MqttService mqttService, DeviceService deviceService, ActionRepository actionRepository) {
        this.mqttService = mqttService;
        this.deviceService = deviceService;
        this.actionRepository = actionRepository;
    }

    @PostMapping("/control")
    public String controlDevice(@RequestParam String action) throws MqttException, ExecutionException, InterruptedException {
        System.out.println(action);
        return mqttService.sendControlMessage(action);
    }
    @GetMapping("/chart")
    public ResponseEntity<?> getChart() {
        return deviceService.getDataChart();
    }
    @GetMapping("/chartRandom")
    public ResponseEntity<?> getChartRandom() {
        return deviceService.getChartRandom();
    }

    @GetMapping("/values")
    public ResponseEntity<?> getValues() {
        return deviceService.getValues();
    }
    @GetMapping("/page")
    public ResponseEntity<?> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "id") String searchBy,
            @RequestParam(required = false) String searchValue
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return deviceService.devicePage(page, size, sort, searchBy, searchValue);
    }
    @GetMapping("/count")
    public ResponseEntity<?> getCount() {
        return deviceService.countRandom();
    }
}

