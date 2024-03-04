import socket
from picar_4wd.utils import power_read, cpu_temperature
import picar_4wd as fc
import time

HOST = "192.168.3.2" # IP address of your Raspberry PI
PORT = 1026       # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()

    up_encoded = "up".encode()
    down_encoded = "down".encode()
    left_encoded = "left".encode()
    right_encoded = "right".encode()
    stop_encoded = "stop".encode()
    speed = 0
    direction = ""
    try:
        while 1:
            client, clientInfo = s.accept()
            # print("server recv from: ", clientInfo)
            # receive 1024 Bytes of message in binary forma
            data = client.recv(1024)

            # decoded = data.decode()
            if (data == up_encoded):
                # time_until_stop = time.time() + 0.05
                # while time.time() < time_until_stop:
                #     fc.forward(10)
                # fc.stop()
                speed = 10
                direction = "forward"
                fc.forward(10)

            elif (data == down_encoded):
                # time_until_stop = time.time() + 0.05
                # while time.time() < time_until_stop:
                #     fc.backward(10)
                # fc.stop()
                speed = 10
                direction = "backward"
                fc.backward(10)

            elif (data == left_encoded):
                # time_until_stop = time.time() + 0.05
                # while time.time() < time_until_stop:
                # fc.stop()
                fc.turn_left(10)
                speed = 0
                direction = "left"

            elif (data == right_encoded):
                # time_until_stop = time.time() + 0.05
                # while time.time() < time_until_stop:
                # fc.stop()
                speed = 0
                fc.turn_right(10)
                direction = "right"
            elif (data == stop_encoded):
                fc.stop()

            if data != b"":
                total_data = str(direction) + "," + str(speed) + "," +str(power_read()) + "," + str(cpu_temperature())
                print(total_data)
                client.sendall(total_data.encode())  # Echo back to client



    # try:
    #     while 1:
    #         client, clientInfo = s.accept()
    #         print("server recv from: ", clientInfo)
    #         data = client.recv(1024)      # receive 1024 Bytes of message in binary format
    #         if data != b"":
    #             print(data)     
    #             client.sendall(data) # Echo back to client
    except: 
        print("Closing socket")
        client.close()
        s.close()    