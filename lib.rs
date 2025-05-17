use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Rechner {
    n: u32,
}

#[wasm_bindgen]
impl Rechner {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Rechner {
        Rechner { n: 0 }
    }

    pub fn next(&mut self) -> f64 {
        let value = 1.0 / (2.0f64).powi(self.n as i32);
        self.n += 1;
        value
    }

    pub fn get_n(&self) -> u32 {
        self.n
    }
}
