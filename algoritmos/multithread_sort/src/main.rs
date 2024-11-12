use std::sync::mpsc::channel;
use std::thread;

use rand::Rng;

fn main() {
    let mut generator = rand::thread_rng();

    let (tx, rx) = channel::<f64>();

    let tx1 = tx.clone();
    let tx2 = tx.clone();
    let tx3 = tx.clone();
    let tx4 = tx.clone();
    let tx5 = tx.clone();

    let elements: Vec<f64> = (0..10000)
        .map(|_| generator.gen_range(0.0..100.0))
        .collect();

    let mut resultados: Vec<f64> = vec![];

    let elements1 = elements[0..2000].to_vec();
    let elements2 = elements[2000..4000].to_vec();
    let elements3 = elements[4000..6000].to_vec();
    let elements4 = elements[6000..8000].to_vec();
    let elements5 = elements[8000..10000].to_vec();

    thread::spawn(move || {
        tx1.send(average(elements1)).unwrap();
    });

    thread::spawn(move || {
        tx2.send(average(elements2)).unwrap();
    });

    thread::spawn(move || {
        tx3.send(average(elements3)).unwrap();
    });

    thread::spawn(move || {
        tx4.send(average(elements4)).unwrap();
    });

    thread::spawn(move || {
        tx5.send(average(elements5)).unwrap();
    });

    for _ in 0..5 {
        resultados.push(rx.recv().unwrap());
    }

    println!("{:#?}", resultados);

    println!("{}", average(resultados));
}

fn average(elements: Vec<f64>) -> f64 {
    let mut sum = 0.0;

    for num in elements.iter() {
        sum += num;
    }

    sum / elements.len() as f64
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn it_sorts_the_array() {}
}
