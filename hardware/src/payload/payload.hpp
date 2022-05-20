class Payload {
    public:
    int soil;
    int temperature;
    int humidity;
    int pressure;
    int light;
    bool rain;

    Payload();

    void get_payload_data();
};
