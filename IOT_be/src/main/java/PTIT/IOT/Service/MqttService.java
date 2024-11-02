package PTIT.IOT.Service;

import PTIT.IOT.Model.Action;
import PTIT.IOT.Model.Device;
import PTIT.IOT.Repository.ActionRepository;
import PTIT.IOT.Repository.DeviceRepository;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class MqttService {
    private MqttClient client;
    final private DeviceRepository deviceRepository;
    final private ActionRepository actionRepository;

    public MqttService(DeviceRepository deviceRepository, ActionRepository actionRepository) throws MqttException {
        this.deviceRepository = deviceRepository;
        this.actionRepository = actionRepository;

        String broker = "tcp://192.168.1.12:2004";
        String clientId = "springBootClient";
        String username = "admin";
        String password = "1";

        // Tạo MQTT Connect Options
        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(username);
        options.setPassword(password.toCharArray());

        // Khởi tạo MqttClient và kết nối
        client = new MqttClient(broker, clientId, new MemoryPersistence());
        client.connect(options);

        // Đăng ký để nhận thông điệp
        client.subscribe("data/sensor", (topic, message) -> {
            String payload = new String(message.getPayload());
            System.out.println("Received message: " + payload);
            try {
                // Chuyển chuỗi JSON sang JSONObject
                JSONObject jsonObject = new JSONObject(payload);

                // Lấy giá trị từ JSONObject
                double temperature = jsonObject.getDouble("temperature");
                double humidity = jsonObject.getDouble("humidity");
                double light = jsonObject.getDouble("light");
                int random = jsonObject.getInt("random");
                Device device = Device.builder()
                        .humidity(String.valueOf(humidity))
                        .temperature(String.valueOf(temperature))
                        .light(String.valueOf(Math.round(((4100.0 - light) / 41.0) * 100.0) / 100.0))
                        .random(random)
                        .time(LocalDateTime.now())
                        .build();
                System.out.println(device.getHumidity());
                deviceRepository.save(device);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        client.subscribe("response",(s, mqttMessage) ->{
            String payload = new String(mqttMessage.getPayload());
            System.out.println("response->" + payload);
            Map<Integer,String> device = new HashMap<>();
            device.put(1,"humidity");
            device.put(2,"temperature");
            device.put(3,"light");
            Action action = new Action();
            switch (payload) {
                case "onLed1":
                    System.out.println("On led 1");
                    action.setDevice(device.get(1));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onLed2":
                    System.out.println("Option 2 selected");
                    action.setDevice(device.get(2));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onLed3":
                    System.out.println("Option 3 selected");
                    action.setDevice(device.get(3));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onAll":
                    System.out.println("All 3 selected");
                    for(int i = 1; i <= 3; i++) {
                        Action action1 = Action.builder()
                                .action("on")
                                .device(device.get(i))
                                .time(LocalDateTime.now())
                                .build();
                        actionRepository.save(action1);
                    }
                    break;
                case "offLed1":
                    System.out.println("off 1 selected");
                    action.setDevice(device.get(1));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offLed2":
                    System.out.println("off 2 selected");
                    action.setDevice(device.get(2));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offLed3":
                    System.out.println("off 3 selected");
                    action.setDevice(device.get(3));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offAll":
                    for(int i = 1; i <= 3; i++) {
                        Action action1 = Action.builder()
                                .action("off")
                                .device(device.get(i))
                                .time(LocalDateTime.now())
                                .build();
                        actionRepository.save(action1);
                    }
                default:
                    System.out.println("Invalid option");
                    break;
            }
        });
    }
    public String sendControlMessage(String message) throws MqttException, ExecutionException, InterruptedException {
        MqttMessage mqttMessage = new MqttMessage(message.getBytes());
        mqttMessage.setQos(2);
        CompletableFuture<String> futurePayload = new CompletableFuture<>();
        System.out.println("Sending control message "+mqttMessage);
        client.publish("esp32/output", mqttMessage);
        client.subscribe("response",(s, mqttMessage2) ->{
            String payload = new String(mqttMessage2.getPayload());
            System.out.println("response->" + payload);
            Map<Integer,String> device = new HashMap<>();
            device.put(1,"humidity");
            device.put(2,"temperature");
            device.put(3,"light");
            device.put(4,"random");
            Action action = new Action();
            switch (payload) {
                case "onLed1":
                    System.out.println("On led 1");
                    action.setDevice(device.get(1));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onLed2":
                    System.out.println("Option 2 selected");
                    action.setDevice(device.get(2));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onLed3":
                    System.out.println("Option 3 selected");
                    action.setDevice(device.get(3));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onLed4":
                    System.out.println("Option 3 selected");
                    action.setDevice(device.get(4));
                    action.setAction("on");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "onAll":
                    System.out.println("All 3 selected");
                    for(int i = 1; i <= 3; i++) {
                        Action action1 = Action.builder()
                                .action("on")
                                .device(device.get(i))
                                .time(LocalDateTime.now())
                                .build();
                        actionRepository.save(action1);
                    }
                    break;
                case "offLed1":
                    System.out.println("off 1 selected");
                    action.setDevice(device.get(1));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offLed2":
                    System.out.println("off 2 selected");
                    action.setDevice(device.get(2));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offLed3":
                    System.out.println("off 3 selected");
                    action.setDevice(device.get(3));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offLed4":
                    System.out.println("off 3 selected");
                    action.setDevice(device.get(4));
                    action.setAction("off");
                    action.setTime(LocalDateTime.now());
                    actionRepository.save(action);
                    break;
                case "offAll":
                    for(int i = 1; i <= 3; i++) {
                        Action action1 = Action.builder()
                                .action("off")
                                .device(device.get(i))
                                .time(LocalDateTime.now())
                                .build();
                        actionRepository.save(action1);
                    }
                default:
                    System.out.println("Invalid option");
                    break;
            }
            futurePayload.complete(payload);
        });
        return futurePayload.get();
    }
}

